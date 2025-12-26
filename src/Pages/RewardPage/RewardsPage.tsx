import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../lib/supabase';
import { type UserProfile } from '../../types';


import DashboardLayout from '../../layout/DashboardLayout';


import StreakCard from '../../Components/Rewards/StreakCard';

import ReferralSection from '../../Components/refferals/ReferralSection';
import RewardsHeader from '../../Components/Rewards/RewardsHeader';
import PointsBalanceCard from '../../Components/Rewards/PointsBalanceCard';
import FeaturedToolCard from '../../Components/Rewards/FeaturedToolCard';
import ReferralPromoCard from '../../Components/Rewards/ReferralPromoCard';
import ShareStackCard from '../../Components/Rewards/ShareStackCard';
import RedeemView from '../../Components/Redeem/RedeemView';
import RewardSkeleton from '../../Components/Loader/Loader';



export default function RewardsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem'>('earn');
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RewardSkeleton key={i} />
          ))}
        </div>
      </DashboardLayout>
    );
  }

   
  return (
    <DashboardLayout>
      <section className="font-sans max-w-7xl mx-auto ">

        {/* Header Section */}
        <RewardsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* CONTENT AREA */}
        {activeTab === 'earn' ? (
          <section className="space-y-8 animate-in slide-in-from-left-4 duration-300">


            <div>
              <div className="flex items-center gap-2 mb-6 border-l-4 border-purple-600 pl-3">
                <h2 className="text-2xl font-bold text-gray-900">Your Rewards Journey</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* 1. Points */}
                <PointsBalanceCard balance={profile?.points_balance || 0} />

                {/* 2. Streak */}
                <div className="">
                  <StreakCard
                    streak={profile?.current_streak || 0}
                    lastCheckIn={profile?.last_checkin_date || null}
                    onClaimSuccess={fetchProfile}
                  />
                </div>

                {/* 3. Featured Tool */}
                <FeaturedToolCard />
              </div>
            </div>

            <div className="pb-10">
              <div className="flex items-center gap-2 mb-6 border-l-4 border-purple-600 pl-3">
                <h2 className="text-2xl font-bold text-gray-900">Earn More Points</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReferralPromoCard />
                <ShareStackCard />
              </div>
            </div>


            <div className="flex items-center gap-2 mb-6 border-l-4 border-purple-600 pl-3">
                <h2 className="text-2xl font-bold text-gray-900">Refer & Earn
                </h2>
              </div>

            <div className="mt-8">
              <ReferralSection
                referralCode={profile?.referral_code || ''}
                referralCount={profile?.referral_count || 0}
                pointsEarned={profile?.referral_earnings || 0}
              />
            </div>

          </section>
        ) : (
          /* REDEEM REWARDS VIEW */
          <div className="animate-in slide-in-from-right-4 duration-300">
            <RedeemView userBalance={profile?.points_balance || 0} />
          </div>
        )}




      </section>
    </DashboardLayout>
  );
}