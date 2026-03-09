import React, { useState } from 'react';
import { Menu, X, Droplets } from 'lucide-react';
import Home from '../views/Home';
import About from '../views/About';
import Knowledge from '../views/Knowledge';
import Support from '../views/Support';
import RoadMap from '../views/RoadMap';
import { PageView } from '../types';
import AdminLogin from "../views/AdminLogin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDashboard from "../views/AdminDashboard";

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

      {currentView !== "admin" && (
        <Header currentView={currentView} navigateTo={navigateTo} />
      )}

      <main className="flex-grow">
        {currentView === 'home' && <Home />}
        {currentView === 'knowledge' && <Knowledge />}
        {currentView === 'roadmap' && <RoadMap />}
        {currentView === 'about' && <About />}
        {currentView === 'support' && <Support />}
        {currentView === 'admin' && (
          <AdminDashboard navigateTo={navigateTo} />
        )}
      </main>

      {currentView !== "admin" && (
        <Footer navigateTo={navigateTo} />
      )}

    </div>
  );
};

export default App;
