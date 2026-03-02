import React, { useState } from 'react';
import { Menu, X, Droplets } from 'lucide-react';
import Home from '../views/Home';
import About from '../views/About';
import Knowledge from '../views/Knowledge';
import Support from '../views/Support';
import RoadMap from '../views/RoadMap';
import { PageView } from '../types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navClasses = (view: PageView) =>
    `text-sm font-bold uppercase tracking-wider hover:text-aqua-light transition-colors ${currentView === view ? 'text-aqua-light' : 'text-slate-300'}`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="fixed top-0 left-0 w-full z-50 bg-aqua-deep/95 backdrop-blur-md border-b border-white/10 shadow-lg text-white h-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
          <nav className="hidden md:flex gap-8 flex-1 justify-end pr-12">
            <button onClick={() => navigateTo('home')} className={navClasses('home')}>Home</button>
            <button onClick={() => navigateTo('knowledge')} className={navClasses('knowledge')}>Knowledge</button>
            <button onClick={() => navigateTo('roadmap')} className={navClasses('roadmap')}>Roadmap</button>
          </nav>

          <div
            className="flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-transform z-10"
            onClick={() => navigateTo('home')}
          >
            <div className="bg-white p-2 rounded-full shadow-lg shadow-aqua-light/20">
              <Droplets className="w-8 h-8 text-aqua-deep" />
            </div>
            <span className="text-xs font-serif font-bold mt-1 tracking-widest text-white/90">AQUA</span>
          </div>

          <nav className="hidden md:flex gap-8 flex-1 justify-start pl-12">
            <button onClick={() => navigateTo('about')} className={navClasses('about')}>About Us</button>
            <button onClick={() => navigateTo('support')} className={navClasses('support')}>Support</button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-aqua-deep absolute top-20 w-full border-t border-white/10 shadow-xl animate-in slide-in-from-top-5">
            <div className="flex flex-col p-6 gap-6 text-center">
              <button onClick={() => navigateTo('home')} className="text-lg font-bold text-white hover:text-aqua-light">Home</button>
              <button onClick={() => navigateTo('knowledge')} className="text-lg font-bold text-white hover:text-aqua-light">Knowledge</button>
              <button onClick={() => navigateTo('roadmap')} className="text-lg font-bold text-white hover:text-aqua-light">Roadmap</button>
              <button onClick={() => navigateTo('about')} className="text-lg font-bold text-white hover:text-aqua-light">About Us</button>
              <button onClick={() => navigateTo('support')} className="text-lg font-bold text-white hover:text-aqua-light">Support</button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {currentView === 'home' && <Home />}
        {currentView === 'knowledge' && <Knowledge />}
        {currentView === 'roadmap' && <RoadMap />}
        {currentView === 'about' && <About />}
        {currentView === 'support' && <Support />}
      </main>

      <footer className="bg-aqua-deep text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Droplets className="w-6 h-6 text-aqua-light" />
                <span className="text-xl font-serif font-bold tracking-wide">AquaSerendib</span>
              </div>
              <p className="text-aqua-pale/70 text-sm max-w-xs">AI-Powered Endemic Freshwater Fish Detection for Sri Lanka.</p>
            </div>

            <div className="flex gap-8 text-sm font-semibold text-aqua-pale">
              <button onClick={() => navigateTo('knowledge')} className="hover:text-white transition-colors">Species Database</button>
              <button onClick={() => navigateTo('roadmap')} className="hover:text-white transition-colors">Roadmap</button>
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">Mission</button>
              <button onClick={() => navigateTo('support')} className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} AquaSerendib. All rights reserved. Preserving Sri Lanka's Aquatic Life.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
