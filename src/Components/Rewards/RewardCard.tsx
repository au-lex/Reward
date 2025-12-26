

interface RewardCardProps {
  title: string;
  description: string;
  cost: number;
  type: string;
  isComingSoon?: boolean; 
  userBalance: number;
}

export default function RewardCard({ title, description, cost, type, isComingSoon = false, userBalance }: RewardCardProps) {

  const isLocked = !isComingSoon && userBalance < cost;

  
  let emojiIcon = "🎁"; 
  if (type === 'money') emojiIcon = "💸";
  if (type === 'course') emojiIcon = "📚";

  return (
    <div className="bg-white p-6 rounded-xl border border-purple-100  hover:shadow-lg transition-all flex flex-col items-center text-center h-full">
      
    
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-3xl ${isComingSoon ? 'bg-gray-100 opacity-50' : 'bg-purple-100'}`}>
        <span className="opacity-50">{emojiIcon}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-700 mb-3">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{description}</p>

      <div className="mt-auto w-full">
        <div className={`flex items-center justify-center gap-1.5 font-bold text-lg mb-6 ${isLocked || isComingSoon ? 'text-gray-400' : 'text-purple-600'}`}>
     
          <span>⭐</span> 
          <span>{cost} pts</span>
        </div>

        <button
          disabled={isLocked || isComingSoon}
          className={`w-full py-3 rounded-xl font-medium transition-colors ${isComingSoon
              ? 'bg-slate-200 text-white cursor-not-allowed'
              : isLocked
                ? 'bg-slate-200 text-white cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
        >
          {isComingSoon ? 'Coming Soon' : isLocked ? 'Locked' : 'Redeem'}
        </button>
      </div>
    </div>
  );
}