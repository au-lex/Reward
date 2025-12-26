import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { type UserProfile } from '../../types';

// Layout
import DashboardLayout from '../../layout/DashboardLayout';

// Features
import StreakCard from '../../Components/Rewards/StreakCard';
import RedeemView from '../../features/rewards/RedeemView';
import ReferralSection from '../../features/refferals/ReferralSection';
import RewardsHeader from '../../Components/Rewards/RewardsHeader';
import PointsBalanceCard from '../../Components/Rewards/PointsBalanceCard';
import FeaturedToolCard from '../../Components/Rewards/FeaturedToolCard';
import ReferralPromoCard from '../../Components/Rewards/ReferralPromoCard';
import ShareStackCard from '../../Components/Rewards/ShareStackCard';



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
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-purple-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <section className="font-sans max-w-7xl mx-auto">

        {/* Header Section */}
        <RewardsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* CONTENT AREA */}
        {activeTab === 'earn' ? (
          <section className="space-y-8 animate-in slide-in-from-left-4 duration-300">

        
            <div>
              <div className="flex items-center gap-2 mb-6 border-l-4 border-purple-600 pl-3">
                <h2 className="text-2xl font-bold text-gray-900">Your Rewards Journey</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            {/* Bottom Section: Earn More */}
            <div className="pb-10">
              <div className="flex items-center gap-2 mb-6 border-l-4 border-purple-600 pl-3">
                <h2 className="text-2xl font-bold text-gray-900">Earn More Points</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReferralPromoCard />
                <ShareStackCard />
              </div>
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