import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import RewardCard from '../Rewards/RewardCard';
import RewardSkeleton from '../Loader/Loader';
import { Tabs } from '../ui/Tabs';
import { PackageOpen } from 'lucide-react'; 
interface RedeemViewProps {
  userBalance: number;
}

let rewardsCache: any[] | null = null;

export default function RedeemView({ userBalance }: RedeemViewProps) {

  const [rewards, setRewards] = useState<any[]>(rewardsCache || []);
  const [filter, setFilter] = useState('all');
  
 
  const [loading, setLoading] = useState(rewardsCache === null);

  useEffect(() => {

    if (rewardsCache) {
        setLoading(false);
        return;
    }

    async function loadRewards() {
      setLoading(true);
      const { data } = await supabase
        .from('rewards')
        .select('*')
        .order('cost', { ascending: true });

      if (data) {
        rewardsCache = data; 
        setRewards(data);
      }
      setLoading(false);
    }
    loadRewards();
  }, []);


  const filteredRewards = rewards.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'coming_soon') return r.is_coming_soon;
    if (filter === 'unlocked') return !r.is_coming_soon && userBalance >= r.cost;
    if (filter === 'locked') return !r.is_coming_soon && userBalance < r.cost;
    return true;
  });


  const counts = {
    all: rewards.length,
    unlocked: rewards.filter(r => !r.is_coming_soon && userBalance >= r.cost).length,
    locked: rewards.filter(r => !r.is_coming_soon && userBalance < r.cost).length,
    coming: rewards.filter(r => r.is_coming_soon).length,
  };

  const tabItems = [
    { id: 'all', label: 'All Rewards', count: counts.all },
    { id: 'unlocked', label: 'Unlocked', count: counts.unlocked },
    { id: 'locked', label: 'Locked', count: counts.locked },
    { id: 'coming_soon', label: 'Coming Soon', count: counts.coming },
  ];

  return (
    <div className='w-full max-w-full space-y-6'>
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-purple-600 pl-3">Redeem Your Points</h2>



      <Tabs items={tabItems} activeId={filter} onChange={setFilter} />
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {loading && (
    
          Array.from({ length: 6 }).map((_, i) => (
            <RewardSkeleton key={i} />
          ))
        )}

   
        {!loading && filteredRewards.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center text-gray-500">
            <div className="bg-gray-50 p-4 rounded-full mb-3">
              <PackageOpen size={48} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No rewards found</h3>
            <p className="max-w-xs mx-auto text-sm mt-1">
              There are no rewards in the "{tabItems.find(t => t.id === filter)?.label}" category right now.
            </p>
          </div>
        )}

 
        {!loading && filteredRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            title={reward.title}
            description={reward.description}
            cost={reward.cost}
            type={reward.type}
            isComingSoon={reward.is_coming_soon}
            userBalance={userBalance}
          />
        ))}
      </div>
    </div>
  );
}