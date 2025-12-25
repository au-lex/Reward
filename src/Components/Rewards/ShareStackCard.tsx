import { Share2 } from 'lucide-react';

export default function ShareStackCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 flex flex-col justify-between overflow-hidden hover:border-purple-200 transition-colors shadow-sm h-full">
      <div className="p-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
          <Share2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Share Your Stack</h4>
          <p className="text-xs text-gray-500 mt-1">Earn +25 pts</p>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-600 font-medium">Share your tool stack</span>
        <button className="px-5 py-2 bg-purple-50 text-purple-700 font-bold rounded-lg text-xs hover:bg-purple-100 transition-colors flex items-center gap-2">
          <Share2 size={14} /> Share
        </button>
      </div>
    </div>
  );
}