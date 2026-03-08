import React, { useState } from "react";
import { Droplets, Shield } from "lucide-react";
import { PageView } from "../types";
import AdminLoginModal from "./AdminLoginModal";

interface FooterProps {
  navigateTo: (view: PageView) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <>
      <footer className="bg-aqua-deep text-white py-12 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            {/* LEFT SIDE */}
            <div className="text-center md:text-left">

              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Droplets className="w-6 h-6 text-aqua-light" />
                <span className="text-xl font-serif font-bold tracking-wide">
                  AquaSerendib
                </span>
              </div>

              <p className="text-aqua-pale/70 text-sm max-w-xs">
                AI-Powered Endemic Freshwater Fish Detection for Sri Lanka.
              </p>

            </div>


            {/* CENTER LINKS */}
            <div className="flex gap-8 text-sm font-semibold text-aqua-pale">

              <button
                onClick={() => navigateTo("knowledge")}
                className="hover:text-white transition-colors"
              >
                Species Database
              </button>

              <button
                onClick={() => navigateTo("roadmap")}
                className="hover:text-white transition-colors"
              >
                Roadmap
              </button>

              <button
                onClick={() => navigateTo("about")}
                className="hover:text-white transition-colors"
              >
                Mission
              </button>

              <button
                onClick={() => navigateTo("support")}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>

            </div>

          </div>


          {/* BOTTOM AREA */}
          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">

            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} AquaSerendib. All rights reserved.
              Preserving Sri Lanka's Aquatic Life.
            </p>

            {/* ADMIN BUTTON */}
            <button
              onClick={() => setShowAdminLogin(true)}
              className="text-white/40 hover:text-white transition-colors"
              title="Admin Login"
            >
              <Shield size={18} />
            </button>

          </div>

        </div>

      </footer>

      {/* LOGIN POPUP */}
      {showAdminLogin && (
        <AdminLoginModal
          close={() => setShowAdminLogin(false)}
          navigateTo={navigateTo}
        />
      )}

    </>
  );
};

export default Footer;