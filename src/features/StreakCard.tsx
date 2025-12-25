import { useState } from 'react';
import { Calendar, Check, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  streak?: number;
  lastCheckIn?: string | null;
  onClaimSuccess?: () => void;
}

export default function StreakCard({ streak = 0, lastCheckIn, onClaimSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  // Helper to check if claimed today
  const isClaimedToday = () => {
    if (!lastCheckIn) return false;
    const today = new Date().toDateString();
    const last = new Date(lastCheckIn).toDateString();
    return today === last;
  };

  const handleClaim = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.rpc('claim_daily_reward', { user_id: user.id });

      if (error) throw error;

      if (onClaimSuccess) onClaimSuccess();
    } catch (err) {
      console.error('Error claiming reward:', err);
      alert('Failed to claim reward. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const claimed = isClaimedToday();

  // Calculate current day index for the UI (0 = Monday, 6 = Sunday)
  // JS getDay(): 0 = Sun, 1 = Mon... 
  const currentDayIndex = (new Date().getDay() + 6) % 7;
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-white rounded-[20px] s-sm border border-gray-100 w-full max-w-sm overflow-hidden font-sans">
      {/* Header Section */}
      <div className="bg-blue-50/60 p-5 flex items-center gap-2.5">
        <Calendar size={22} className="text-blue-500" />
        <h3 className="font-bold text-gray-700 text-lg">Daily Streak</h3>
      </div>

      {/* Body Section */}
      <div className="p-6">
        {/* Streak Count */}
        <div className="mb-6">
          <span className="text-5xl font-bold text-purple-600 tracking-tight">{streak}</span>
          <span className="text-4xl font-bold text-purple-600 ml-2">day</span>
        </div>

        {/* Days of Week Row */}
        <div className="flex justify-between items-center mb-4 px-1">
          {weekDays.map((day, i) => {
            const isToday = i === currentDayIndex;
            // You can add logic here to highlight past claimed days if you have that data
            return (
              <div
                key={i}
                className={`
                            w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                            ${isToday
                    ? 'bg-gray-100 text-gray-700 border-2 border-purple-500 ring-2 ring-purple-100 ring-offset-1'
                    : 'bg-gray-200/70 text-gray-500'
                  }
                        `}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Helper Text */}
        <p className="text-center text-gray-600 text-sm font-medium mb-6">
          Check in daily to earn +5 points
        </p>

        {/* Action Button */}
        <button
          onClick={handleClaim}
          disabled={claimed || loading}
          className={`
            w-full py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-sm transition-all s-md
            ${claimed
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed s-none'
              : 'bg-purple-600 text-white hover:bg-purple-700 hover:s-lg active:scale-[0.98]'
            }
          `}
        >
          {loading ? (
            <span>Claiming...</span>
          ) : claimed ? (
            <>
              <Check size={18} strokeWidth={3} /> Claimed Today
            </>
          ) : (
            <>
              <Zap size={18} className="fill-white" /> Claim Today's Points
            </>
          )}
        </button>
      </div>
    </div>
  );
}