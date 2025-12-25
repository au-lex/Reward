import { Award, Rocket, Star } from 'lucide-react';

interface PointsBalanceCardProps {
  balance?: number;
}

export default function PointsBalanceCard({ balance = 5 }: PointsBalanceCardProps) {
  const GOAL = 5000;
  const progressPercentage = Math.min((balance / GOAL) * 100, 100);

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 w-full max-w-sm overflow-hidden font-sans">
      {/* Header Section */}
      <div className="bg-indigo-50/60 p-5 flex items-center gap-2.5">
        <Award size={22} className="text-purple-600 fill-purple-600" />
        <h3 className="font-bold text-gray-700 text-lg">Points Balance</h3>
      </div>

      {/* Body Section */}
      <div className="p-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          {/* Big Number */}
          <span className="text-7xl font-bold text-purple-600 tracking-tighter">
            {balance}
          </span>
          
          {/* Gold Coin Visual */}
          <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <Star size={24} className="text-amber-600 fill-amber-600" />
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>Progress to $5 Gift Card</span>
            <span className="text-gray-800">{balance}/{GOAL}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-300 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progressPercentage, 2)}%` }} // Minimum width for visibility
            ></div>
          </div>
          
          {/* Footer Message */}
          <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
            <Rocket size={16} className="text-gray-400 fill-gray-400" />
            <span>Just getting started — keep earning points!</span>
          </div>
        </div>
      </div>
    </div>
  );
}