import { Bell } from 'lucide-react';

interface RewardsHeaderProps {
  activeTab: 'earn' | 'redeem';
  setActiveTab: (tab: 'earn' | 'redeem') => void;
}

export default function RewardsHeader({ activeTab, setActiveTab }: RewardsHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rewards Hub</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={() => setActiveTab('earn')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 rounded-t-md ${
              activeTab === 'earn'
                ? 'bg-purple-100 text-purple-700 border-purple-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Earn Points
          </button>
          <button
            onClick={() => setActiveTab('redeem')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 rounded-t-md ${
              activeTab === 'redeem'
                ? 'bg-purple-100 text-purple-700 border-purple-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Redeem Rewards
          </button>
        </div>
      </div>

      {/* Notification Bell */}
      <div className="pt-1">
        <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors relative text-gray-600">
          <Bell size={20} />
          {/* Updated Badge with Number */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            2
          </span>
        </button>
      </div>
    </div>
  );
}