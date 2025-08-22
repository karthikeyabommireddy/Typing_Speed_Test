import React, { useState } from 'react';
import { Trophy, Target, Zap, TrendingUp, RotateCcw, Award, Clock, Share2, Check, Copy } from 'lucide-react';

const TestResults = ({ wpm, accuracy, errors, duration, streak, onRestart }) => {
  const [copyStatus, setCopyStatus] = useState('idle'); // 'idle', 'copying', 'success', 'error'
  
  const handleShareResults = async () => {
    setCopyStatus('copying');
    
    const shareText = `I just completed a typing test!\n🚀 Speed: ${Math.round(wpm)} WPM\n🎯 Accuracy: ${Math.round(accuracy)}%\n🏆 Level: ${performance.level}\n\nTry it yourself at SpeedType!`;
    const shareData = {
      title: 'My Typing Test Results - SpeedType',
      text: shareText,
      url: window.location.origin
    };
    
    try {
      // Try Web Share API first (mobile-friendly)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setCopyStatus('success');
        return;
      }
      
      // Check if the Clipboard API is available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareText);
        setCopyStatus('success');
      } else {
        // Fallback for older browsers or insecure contexts
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopyStatus('success');
        } else {
          setCopyStatus('error');
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('error');
    }
    
    // Reset status after 2 seconds
    setTimeout(() => {
      setCopyStatus('idle');
    }, 2000);
  };

  const getPerformanceLevel = (wpm) => {
    if (wpm >= 80) return { level: 'Expert', color: 'from-purple-500 to-pink-500', icon: Trophy };
    if (wpm >= 60) return { level: 'Advanced', color: 'from-blue-500 to-purple-500', icon: Award };
    if (wpm >= 40) return { level: 'Intermediate', color: 'from-green-500 to-blue-500', icon: TrendingUp };
    return { level: 'Beginner', color: 'from-orange-500 to-red-500', icon: Target };
  };

  const performance = getPerformanceLevel(wpm);
  const PerformanceIcon = performance.icon;

  const stats = [
    {
      label: 'Words Per Minute',
      value: Math.round(wpm),
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-400/20'
    },
    {
      label: 'Accuracy',
      value: `${Math.round(accuracy)}%`,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-400/20'
    },
    {
      label: 'Errors',
      value: errors,
      icon: TrendingUp,
      color: 'text-red-400',
      bgColor: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-400/20'
    },
    {
      label: 'Best Streak',
      value: streak,
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-400/20'
    },
    {
      label: 'Test Duration',
      value: `${duration}s`,
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-400/20'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      <div className="animate-in slide-in-from-bottom-8 duration-700">
        {/* Main Result Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${performance.color} mb-4 shadow-lg animate-pulse`}>
              <PerformanceIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Test Complete!
            </h2>
            <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${performance.color} text-white font-bold text-lg shadow-lg`}>
              {performance.level} Level
            </div>
          </div>

          {/* Primary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-400/20">
              <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {Math.round(wpm)}
              </div>
              <div className="text-blue-300 font-medium">Words Per Minute</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl border border-green-400/20">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {Math.round(accuracy)}%
              </div>
              <div className="text-green-300 font-medium">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-lg rounded-xl border ${stat.borderColor} p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-slate-300 font-medium">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Performance Analysis */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Performance Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Typing Speed</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((wpm / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-blue-400 font-medium">{Math.round(wpm)} WPM</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Accuracy</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${accuracy}%` }}
                  ></div>
                </div>
                <span className="text-green-400 font-medium">{Math.round(accuracy)}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Consistency</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((streak / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-purple-400 font-medium">{streak} chars</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 inline mr-2 transition-transform duration-300 group-hover:rotate-180" />
            Take Another Test
          </button>
          
          <button
            onClick={handleShareResults}
            disabled={copyStatus === 'copying'}
            className={`px-8 py-4 border border-white/20 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 min-w-[180px] ${
              copyStatus === 'success'
                ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-400/40'
                : copyStatus === 'error'
                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/40'
                : copyStatus === 'copying'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/40 cursor-wait'
                : 'bg-white/10 hover:bg-white/20 text-white hover:border-white/40'
            }`}
          >
            {copyStatus === 'copying' && <Copy className="w-5 h-5 animate-spin" />}
            {copyStatus === 'success' && <Check className="w-5 h-5" />}
            {copyStatus === 'error' && <Share2 className="w-5 h-5" />}
            {copyStatus === 'idle' && <Share2 className="w-5 h-5" />}
            <span>
              {copyStatus === 'copying' && 'Copying...'}
              {copyStatus === 'success' && 'Copied!'}
              {copyStatus === 'error' && 'Copy Failed'}
              {copyStatus === 'idle' && 'Share Results'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
