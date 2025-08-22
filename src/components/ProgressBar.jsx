import React from 'react';
import { Clock, Zap, Target, Award } from 'lucide-react';

const ProgressBar = ({ timeLeft, totalTime, wpm, accuracy, streak }) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="space-y-4">
      {/* Main Progress Bar */}
      <div className="relative">
        <div className="w-full bg-slate-700/50 rounded-full h-3 backdrop-blur-sm border border-slate-600/50">
          <div 
            className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Time indicator */}
        <div className="absolute -top-8 left-0 right-0 flex justify-between items-center">
          <span className="text-slate-400 text-sm font-medium">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-slate-400 text-sm font-medium">
            {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Live Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        <div className="flex items-center space-x-1 px-3 py-2 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-400/20">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">{timeLeft}s</span>
        </div>
        
        <div className="flex items-center space-x-1 px-3 py-2 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-400/20">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">{Math.round(wpm)}</span>
        </div>
        
        <div className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 rounded-lg backdrop-blur-sm border border-green-400/20">
          <Target className="w-4 h-4 text-green-400" />
          <span className="text-green-300 text-sm font-medium">{Math.round(accuracy)}%</span>
        </div>
        
        <div className="flex items-center space-x-1 px-3 py-2 bg-orange-500/20 rounded-lg backdrop-blur-sm border border-orange-400/20">
          <Award className="w-4 h-4 text-orange-400" />
          <span className="text-orange-300 text-sm font-medium">{streak}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
