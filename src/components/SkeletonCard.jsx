import React from "react";

const SkeletonCard = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
      <div className="h-[350px] bg-gray-200 "></div>
      <div className="p-6 space-y-3">
        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse"></div>
    
      </div>
    </div>
  );
};

export default SkeletonCard;