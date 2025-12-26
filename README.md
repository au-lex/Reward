

### `README.md`

```markdown
# Flowva Rewards Hub - Technical Assessment

A pixel-perfect recreation of the Flowva Rewards Page, built with **React**, **TypeScript**, and **Supabase**. This project demonstrates clean architecture, real-time database interactions, and robust authentication logic as requested in the assessment.

# Live Demo
[https://reward-weld.vercel.app]



#Tech Stack

Frontend: React (Vite), TypeScript, Tailwind CSS
Backend: Supabase 
State Management:React Hooks
Styling: Tailwind CSS (Utility-first for rapid UI development)
Icons: Lucide React



##  Key Features Implemented

1.  **Authentication System:**
    * Secure Login/Sign-up flow using Supabase Auth.
    * **Auto-Profile Creation:** A Database Trigger automatically creates a user profile entry upon signup.
    * **Protected Routes:** Redirects unauthorized users to the login page.

2.  **Rewards Dashboard ("Earn Points"):**
    * **Real-time Balance:** Fetches user points and streak data from the `profiles` table.
    * **Daily Streak Logic:** Custom PostgreSQL function (`claim_daily_reward`) enforces a 24-hour cooldown on claiming points to prevent frontend tampering.
    * **Referral System:** Generates a unique referral link for every user.

3.  **Redemption System ("Redeem Rewards"):**
    * **Tabbed Interface:** Filters rewards by "All", "Unlocked" (affordable), "Locked" (too expensive), and "Coming Soon".
    * **Smart Logic:** "Redeem" buttons are automatically disabled if the user's point balance is insufficient.

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/au-lex/Reward]
cd Reward

```

### 2. Install dependencies

```bash
npm install

```

### 3. Environment Variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

```

### 4. Database Setup (Supabase)

To replicate the backend, run the following SQL script in your Supabase **SQL Editor**. This creates the necessary tables, security policies, and dummy data.

```sql
-- 1. Create PROFILES table (Stores points, streaks, and referrals)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  points_balance int default 0,
  current_streak int default 0,
  last_checkin_date timestamptz,
  referral_code text unique,
  referral_count int default 0,
  referral_earnings int default 0
);

-- 2. Create REWARDS table
create table rewards (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  cost int not null,
  type text check (type in ('money', 'giftcard', 'course')), 
  is_coming_soon boolean default false,
  created_at timestamptz default now()
);

-- 3. Enable Security (Row Level Security)
alter table profiles enable row level security;
alter table rewards enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Anyone can see rewards" on rewards for select using (true);

-- 4. Automate Profile Creation on Signup (Trigger)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, referral_code)
  values (new.id, new.email, split_part(new.email, '@', 1) || floor(random() * 1000 + 1000)::text);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. "Claim Daily Reward" Logic (Backend Function)
create or replace function claim_daily_reward(user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update profiles
  set 
    points_balance = points_balance + 5,
    current_streak = current_streak + 1,
    last_checkin_date = now()
  where id = user_id;
end;
$$;

-- 6. Insert Dummy Data for Rewards
insert into rewards (title, description, cost, type, is_coming_soon) values
('$5 Bank Transfer', 'The $5 equivalent will be transferred to your bank account.', 5000, 'money', false),
('$5 PayPal International', 'Receive a $5 PayPal balance transfer directly to your email.', 5000, 'money', false),
('$5 Virtual Visa Card', 'Use your $5 prepaid card to shop anywhere Visa is accepted.', 5000, 'giftcard', false),
('$5 Apple Gift Card', 'Redeem this for apps, games, music, movies, and more.', 5000, 'giftcard', false),
('$5 Google Play Card', 'Use this to purchase apps, games, movies, and books.', 5000, 'giftcard', false),
('$10 Amazon Gift Card', 'Get a $10 digital gift card to spend on your favorite tools.', 10000, 'giftcard', false),
('Free Udemy Course', 'Coming Soon!', 0, 'course', true);

```

### 5. Run Locally

```bash
npm run dev


# Assumptions & Trade-offs

Logic Placement: I moved the "Streak Validation" logic to a backend SQL function (`claim_daily_reward`) instead of keeping it purely on the frontend. This ensures a user cannot "hack" their streak by manipulating local browser time or JavaScript variables.
UI Library: I utilized **Tailwind CSS** for styling to adhere to the strict deadline and ensure mobile responsiveness without the overhead of writing custom CSS classes.
Email Verification: For the purpose of this assessment, I assumed email verification is disabled to facilitate smoother testing of the sign-up flow.



**Submitted by:** [boniface ifebuche]

