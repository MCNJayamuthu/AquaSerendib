import React, { useState } from "react";
import { Menu, X, Droplets } from "lucide-react";
import { PageView } from "../types";

interface HeaderProps {
  currentView: PageView;
  navigateTo: (view: PageView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, navigateTo }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navClasses = (view: PageView) =>
    `text-sm font-bold uppercase tracking-wider hover:text-aqua-light transition-colors ${
      currentView === view ? "text-aqua-light" : "text-slate-300"
    }`;

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-aqua-deep/95 backdrop-blur-md border-b border-white/10 shadow-lg text-white h-20">

      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">

        {/* LEFT NAV */}
        <nav className="hidden md:flex gap-8 flex-1 justify-end pr-12">
          <button onClick={() => navigateTo("home")} className={navClasses("home")}>
            Home
          </button>

          <button onClick={() => navigateTo("knowledge")} className={navClasses("knowledge")}>
            Knowledge
          </button>

          <button onClick={() => navigateTo("roadmap")} className={navClasses("roadmap")}>
            Roadmap
          </button>
        </nav>

        {/* CENTER LOGO */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-transform z-10"
          onClick={() => navigateTo("home")}
        >
          <div className="bg-white p-2 rounded-full shadow-lg shadow-aqua-light/20">
            <Droplets className="w-8 h-8 text-aqua-deep" />
          </div>

          <span className="text-xs font-serif font-bold mt-1 tracking-widest text-white/90">
            AQUA
          </span>
        </div>

        {/* RIGHT NAV */}
        <nav className="hidden md:flex gap-8 flex-1 justify-start pl-12">
          <button onClick={() => navigateTo("about")} className={navClasses("about")}>
            About Us
          </button>

          <button onClick={() => navigateTo("support")} className={navClasses("support")}>
            Support
          </button>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-aqua-deep absolute top-20 w-full border-t border-white/10 shadow-xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 gap-6 text-center">

            <button
              onClick={() => navigateTo("home")}
              className="text-lg font-bold text-white hover:text-aqua-light"
            >
              Home
            </button>

            <button
              onClick={() => navigateTo("knowledge")}
              className="text-lg font-bold text-white hover:text-aqua-light"
            >
              Knowledge
            </button>

            <button
              onClick={() => navigateTo("roadmap")}
              className="text-lg font-bold text-white hover:text-aqua-light"
            >
              Roadmap
            </button>

            <button
              onClick={() => navigateTo("about")}
              className="text-lg font-bold text-white hover:text-aqua-light"
            >
              About Us
            </button>

            <button
              onClick={() => navigateTo("support")}
              className="text-lg font-bold text-white hover:text-aqua-light"
            >
              Support
            </button>

          </div>
        </div>
      )}

    </header>

  );
};

export default Header;