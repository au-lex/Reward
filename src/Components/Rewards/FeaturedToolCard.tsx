import { Calendar, Gift, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedToolCard() {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden s-sm border border-gray-100 w-full max-w-sm font-sans flex flex-col">
      {/* --- Header Section (Gradient) --- */}
      <section className="bg-gradient-to-r flex justify-between from-purple-600 to-blue-400 p-6 pt-7 relative h-40">

        {/* Featured Badge */}
        <div className=''>

        <h2 className="bg-white/25 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full inline-block mb-3 tracking-wide">
          Featured
        </h2>

        {/* Title & Subtitle */}
        <h3 className="font-bold text-white text-xl ">Top Tool Spotlight</h3>
        <p className="text-white font-bold text-lg opacity-95">Reclaim</p>

        </div>

        <div className="abs h-16 w-16 rounded-full overflow-hidden">
          <img src="https://api.flowvahub.com/storage/v1/object/public/icons//reclaim%20(1).png" alt="" />
        </div>
      </section>


      <div className="p-6">

        {/* Feature Headline */}
        <div className="flex gap-3 items-start mb-3">
          <Calendar className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <section className="txt">

          <h4 className="font-bold text-gray-800 text-sm mb-2 leading-tight">
            Automate and Optimize Your Schedule
          </h4>
              {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
        </p>
          </section>
        </div>

    

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-between ">
          <Link to="https://go.reclaim.ai/ur9i6g5eznps" target='_blank' className=" min-w-[120px] bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-full text-[14px] font-bold transition-all flex items-center justify-center gap-1.5 ">
            <UserPlus size={16} /> Sign up
          </Link>

          <Link to="https://go.reclaim.ai/ur9i6g5eznps" target='_blank'  className="bg-gradient-to-r min-w-[120px] from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 s-md s-pink-200">
            <Gift size={16} /> Claim 50 pts
          </Link>
        </div>
      </div>
    </div>
  );
}