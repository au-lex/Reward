import { Star } from 'lucide-react';

export default function ReferralPromoCard() {
  return (
    <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow w-full font-sans">
      <div className="flex items-start gap-5">
        {/* Icon Box */}
        <div className="w-14 h-14 rounded-[18px] bg-purple-50 flex items-center justify-center shrink-0">
          <Star size={26} className="text-purple-600" strokeWidth={2.5} />
        </div>
        
        {/* Text Content */}
        <div className="pt-0.5">
          <h4 className="font-bold text-gray-900 text-lg mb-1">
            Refer and win 10,000 points!
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            Invite 3 friends by <span className="text-gray-900 font-bold">Nov 20</span> and earn a chance to be one of 5 winners of <span className="text-purple-700 font-bold">10,000 points</span>.
          </p>
        </div>
      </div>
    </div>
  );
}