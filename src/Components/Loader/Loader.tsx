// components/Rewards/RewardSkeleton.tsx
export default function RewardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center h-full animate-pulse">
      {/* Icon Placeholder */}
      <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
      
      {/* Title Placeholder */}
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      
      {/* Description Placeholder (2 lines) */}
      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" />
      
      <div className="mt-auto w-full">
        {/* Cost Placeholder */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
        
        {/* Button Placeholder */}
        <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
}