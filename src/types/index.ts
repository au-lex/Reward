export interface UserProfile {
  id: string;
  email: string;
  points_balance: number;
  current_streak: number;
  last_checkin_date: string | null;

  referral_code?: string;
  referral_count?: number;
  referral_earnings?: number;
}