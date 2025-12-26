import { Star } from 'lucide-react';

export default function ReferralPromoCard() {
  return (
    <section className="bg-  rounded-xl overflow-hidden border border-border s-sm hover:s-md transition-s w-full font-sans">
      <div className="flex items-center gap-3  bg-white p-3">
        {/* Icon Box */}
        <span className="w-12 h-12 rounded-[18px] bg-purple-50 flex items-center justify-center shrink-0">
          <Star size={26} className="text-purple-600" strokeWidth={2.5} />
        </span>
        <h4 className="font-bold text-gray-900 text-[14px] mb-1">
            Refer and win 10,000 points!
          </h4>
        </div>

        {/* Text Content */}
        <div className="p-3">
 
          <p className="text-sm text-gray-500 ">
            Invite 3 friends by <span className="text-gray-900 ">Nov 20</span> and earn a chance to be one of 5 winners of <span className="text-purple-700 ">10,000 points</span>. Friends must complete onboarding to qualify.
            
          </p>
        </div>

    </section>
  );
}