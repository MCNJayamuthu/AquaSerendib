import React from 'react';
import { Fish } from 'lucide-react';

const SwimmingFishLoader: React.FC = () => {
  return (
    <div className="w-full h-48 relative overflow-hidden bg-aqua-pale/30 rounded-lg border border-aqua-light/20 flex flex-col items-center justify-center">
      
      {/* Background Water Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-1 bg-blue-300 animate-pulse"></div>
        <div className="absolute top-2/4 left-0 w-full h-1 bg-blue-400 animate-pulse delay-75"></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-blue-300 animate-pulse delay-150"></div>
      </div>

      {/* Swimming Fish */}
      <div className="absolute top-1/3 left-[-50px] animate-[swim_4s_linear_infinite]">
        <Fish className="text-aqua-mid w-8 h-8 opacity-80" />
      </div>
      <div className="absolute top-1/2 left-[-100px] animate-[swim_5s_linear_infinite_0.5s]">
         <Fish className="text-aqua-deep w-10 h-10" />
      </div>
      <div className="absolute top-2/3 left-[-150px] animate-[swim_3.5s_linear_infinite_1s]">
         <Fish className="text-teal-600 w-6 h-6 opacity-90" />
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white">
        <p className="text-aqua-deep font-serif font-bold animate-pulse">Analyzing Species...</p>
      </div>
    </div>
  );
};

export default SwimmingFishLoader;