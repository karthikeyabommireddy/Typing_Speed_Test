import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, RotateCcw, Zap, Target, TrendingUp, Award } from 'lucide-react';
import TestResults from './TestResults';
import ProgressBar from './ProgressBar';
import { calculateWPM, calculateAccuracy } from '../utils/calculations';
import { getRandomText } from '../utils/sampleTexts';

const TypingTest = () => {
  const [testText, setTestText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [testDuration, setTestDuration] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  
  const inputRef = useRef(null);
  const testRef = useRef(null);

  const wpm = calculateWPM(userInput, startTime, endTime || Date.now());
  const accuracy = calculateAccuracy(userInput, testText.substring(0, userInput.length));

  const initializeTest = useCallback(() => {
    const newText = getRandomText();
    setTestText(newText);
    setUserInput('');
    setTimeLeft(testDuration);
    setIsActive(false);
    setIsCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setCurrentIndex(0);
    setStreak(0);
    setIsRestarting(false);
  }, [testDuration]);

  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            setEndTime(Date.now());
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    if (!isActive && value.length === 1) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    if (value.length <= testText.length) {
      setUserInput(value);
      
      const newCurrentIndex = value.length;
      setCurrentIndex(newCurrentIndex);

      // Check for errors
      let newErrors = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== testText[i]) {
          newErrors++;
        }
      }
      
      // Update streak
      const lastChar = value[value.length - 1];
      const expectedChar = testText[value.length - 1];
      
      if (lastChar === expectedChar) {
        setStreak(prev => {
          const newStreak = prev + 1;
          setMaxStreak(current => Math.max(current, newStreak));
          return newStreak;
        });
      } else if (lastChar !== undefined) {
        setStreak(0);
      }
      
      setErrors(newErrors);

      if (value.length === testText.length) {
        setIsActive(false);
        setIsCompleted(true);
        setEndTime(Date.now());
      }
    }
  };

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => {
      initializeTest();
    }, 300);
  };

  const handleDurationChange = (duration) => {
    setTestDuration(duration);
    setTimeLeft(duration);
    initializeTest();
  };

  const renderText = () => {
    return testText.split('').map((char, index) => {
      let className = 'transition-all duration-75 ';
      
      if (index < userInput.length) {
        className += userInput[index] === char 
          ? 'text-green-400 bg-green-400/20 rounded px-0.5' 
          : 'text-red-400 bg-red-400/20 rounded px-0.5';
      } else if (index === currentIndex && isActive) {
        className += 'bg-blue-400/40 text-white animate-pulse rounded px-0.5';
      } else {
        className += 'text-slate-400';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  if (isCompleted) {
    return (
      <TestResults
        wpm={wpm}
        accuracy={accuracy}
        errors={errors}
        duration={testDuration}
        streak={maxStreak}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      {/* Duration Selection */}
      <div className="mb-8">
        <div className="flex justify-center space-x-2 mb-6">
          {[15, 30, 60, 120].map((duration) => (
            <button
              key={duration}
              onClick={() => handleDurationChange(duration)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                testDuration === duration
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-110'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {duration}s
            </button>
          ))}
        </div>
        
        <ProgressBar 
          timeLeft={timeLeft} 
          totalTime={testDuration}
          wpm={wpm}
          accuracy={accuracy}
          streak={streak}
        />
      </div>

      {/* Main Test Area */}
      <div className={`transition-all duration-500 ${isRestarting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div 
          ref={testRef}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-6 shadow-2xl"
        >
          <div className="text-xl md:text-2xl leading-relaxed font-mono text-left">
            {renderText()}
          </div>
        </div>

        <div className="text-center">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isCompleted || timeLeft === 0}
            placeholder={isActive ? "Keep typing..." : "Start typing to begin..."}
            className="w-full max-w-2xl px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white text-lg font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            autoFocus
          />
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-4 border border-blue-400/20">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Time</span>
            </div>
            <div className="text-2xl font-bold text-white">{timeLeft}s</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-4 border border-purple-400/20">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">WPM</span>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(wpm)}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-xl p-4 border border-green-400/20">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(accuracy)}%</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-4 border border-orange-400/20">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">Streak</span>
            </div>
            <div className="text-2xl font-bold text-white">{streak}</div>
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleRestart}
            className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 inline mr-2 transition-transform duration-300 group-hover:rotate-180" />
            Restart Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
