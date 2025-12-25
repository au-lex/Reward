import { Gift, Landmark, BookOpen, Star } from 'lucide-react';

interface RewardCardProps {
  title: string;
  description: string;
  cost: number;
  type: string;
  isComingSoon: boolean;
  userBalance: number;
}

export default function RewardCard({ title, description, cost, type, isComingSoon, userBalance }: RewardCardProps) {

  const isLocked = !isComingSoon && userBalance < cost;

  // Icon Selection Logic
  const Icon = type === 'money' ? Landmark : type === 'course' ? BookOpen : Gift;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 s-sm flex flex-col items-center text-center h-full hover:s-md transition-s">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isComingSoon ? 'bg-gray-100 text-gray-400' : 'bg-purple-50 text-purple-600'}`}>
        <Icon size={24} />
      </div>

      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>

      <div className="mt-auto w-full">
        <div className={`flex items-center justify-center gap-1 font-bold text-sm mb-4 ${isLocked || isComingSoon ? 'text-gray-400' : 'text-yellow-500'}`}>
          <Star size={16} className="fill-current" />
          <span>{cost} pts</span>
        </div>

        <button
          disabled={isLocked || isComingSoon}
          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${isComingSoon
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isLocked
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2'
                : 'bg-purple-600 text-white hover:bg-purple-700 s-sm'
            }`}
        >
          {isComingSoon ? 'Coming Soon' : isLocked ? 'Locked' : 'Redeem'}
        </button>
      </div>
    </div>
  );
}