import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import RewardCard from '../RewardCard';
import { Tabs } from '../../Components/ui/Tabs';

interface RedeemViewProps {
  userBalance: number;
}

export default function RedeemView({ userBalance }: RedeemViewProps) {
  const [rewards, setRewards] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRewards() {
      const { data } = await supabase.from('rewards').select('*').order('cost', { ascending: true });
      if (data) setRewards(data);
      setLoading(false);
    }
    loadRewards();
  }, []);

  // Filter Logic
  const filteredRewards = rewards.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'coming_soon') return r.is_coming_soon;
    if (filter === 'unlocked') return !r.is_coming_soon && userBalance >= r.cost;
    if (filter === 'locked') return !r.is_coming_soon && userBalance < r.cost;
    return true;
  });

  // Calculate counts for tabs
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

  if (loading) return <div className="py-10 text-center text-gray-500">Loading rewards...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-purple-600 pl-3">Redeem Your Points</h2>
      
      <Tabs items={tabItems} activeId={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
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