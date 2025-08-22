import React from 'react';
import TypingTest from './components/TypingTest';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <header className="text-center py-8 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              SpeedType
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl">
            Test your typing speed with style
          </p>
        </header>
        <TypingTest />
      </div>
    </div>
  );
}

export default App;
