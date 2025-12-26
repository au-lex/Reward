import { useState } from 'react';
import { Copy, Check, Users, } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
interface ReferralSectionProps {
  referralCode: string;
  referralCount: number;
  pointsEarned: number;
}

export default function ReferralSection({ referralCode, referralCount, pointsEarned }: ReferralSectionProps) {
  const [copied, setCopied] = useState(false);

  const referralLink = `https://app.flowvahub.com/signup/?ref=${referralCode || 'join'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full ">
  

      {/* Main Card */}
      <section className=" rounded-xl overflow-hidden  border border-gray-100 s-sm">

        {/* Top Content: Info & Stats */}
        <section className="mb-10 ">
          <div className="flex items-center gap-4 mb-10 bg-[#EEF2FF] p-4">
            <div className=" text-purple-600">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-0.5">Share Your Link</h3>
              <p className="text-gray-500 text-sm font-medium">
                Invite friends and earn 25 points when they join!
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-around items-center px-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-purple-600 mb-1">{referralCount}</span>
              <span className="text-sm text-gray-600 font-medium">Referrals</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-purple-600 mb-1">{pointsEarned}</span>
              <span className="text-sm text-gray-600 font-medium">Points Earned</span>
            </div>
          </div>
        </section>

        <section className="px-4">

  

        {/* Link Section (Purple Background Block) */}
        <div className="bg-purple-50/60 rounded-xl p-6 mb-8 border border-purple-100/50">
          <label className="text-sm text-gray-600 font-medium mb-3 block">
            Your personal referral link:
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full bg-white border border-gray-200 text-gray-600 text-sm rounded-xl py-3.5 px-4 pr-12 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all s-sm"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 p-2 hover:bg-gray-50 rounded-lg transition-colors text-purple-600"
              title="Copy to clipboard"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        </section>

        {/* Social Share Buttons */}
        <div className="flex justify-center gap-5">
          {/* Facebook */}
          <button className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-transform hover:-translate-y-1 s-sm">
          <FaFacebookF size={20}  />
          </button>

          {/* X (Twitter) */}
          <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:opacity-90 transition-transform hover:-translate-y-1 s-sm">
            <FaXTwitter size={20} fill="white" className="ml-0.5" />
          </button>

          {/* LinkedIn */}
          <button className="w-10 h-10 bg-[#0A66C2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-transform hover:-translate-y-1 s-sm">
          <FaLinkedinIn size={20} fill="white" />
          </button>

          {/* WhatsApp */}
          <button className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-transform hover:-translate-y-1 s-sm">
          <FaWhatsapp size={24} fill="white" />
          </button>
        </div>

      </section>
    </main>
  );
}