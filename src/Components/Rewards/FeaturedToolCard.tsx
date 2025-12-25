import { Calendar, Gift, UserPlus } from 'lucide-react';

export default function FeaturedToolCard() {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden s-sm border border-gray-100 w-full max-w-sm font-sans flex flex-col">
      {/* --- Header Section (Gradient) --- */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-400 p-6 pt-7 relative h-40">

        {/* Featured Badge */}
        <span className="bg-white/25 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full inline-block mb-3 tracking-wide">
          Featured
        </span>

        {/* Title & Subtitle */}
        <h3 className="font-bold text-white text-xl mb-1">Top Tool Spotlight</h3>
        <p className="text-white font-bold text-lg opacity-95">Reclaim</p>

        {/* Abstract Logo Circle */}
        <div className="absolute top-6 right-6">
          <div className="w-12 h-12 bg-[#3f4585] rounded-full relative s-lg overflow-hidden">
            {/* Shapes inside the logo to mimic the image */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 bg-pink-400 rounded-[1px]"></div>
            <div className="absolute bottom-3 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-yellow-400 rotate-12"></div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-white rounded-full"></div>
            <div className="absolute bottom-2 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>

      {/* --- Body Section (White) --- */}
      <div className="p-6">

        {/* Feature Headline */}
        <div className="flex gap-3 items-start mb-3">
          <Calendar className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <h4 className="font-bold text-gray-800 text-sm leading-tight">
            Automate and Optimize Your Schedule
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 s-md s-purple-200">
            <UserPlus size={16} /> Sign up
          </button>

          <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 s-md s-pink-200">
            <Gift size={16} /> Claim 50 pts
          </button>
        </div>
      </div>
    </div>
  );
}