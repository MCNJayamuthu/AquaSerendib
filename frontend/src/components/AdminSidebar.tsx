import React, { useState } from "react";
import { Fish, MessageCircle, Map, LogOut, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
  onLogout: () => void;
}

const AdminSidebar: React.FC<Props> = ({ onLogout }) => {

  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard/fish", label: "Fish Management", icon: Fish },
    { path: "/admin/dashboard/support", label: "Support Messages", icon: MessageCircle },
    { path: "/admin/dashboard/roadmap", label: "Roadmap", icon: Map }
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-aqua-deep text-white">
        <h2 className="text-lg font-bold">Admin Panel</h2>

        <button onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* OVERLAY (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-72 z-50
          bg-gradient-to-b from-aqua-deep to-aqua-darker text-white
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col shadow-2xl
        `}
      >
        {/* HEADER */}
        <div className="p-8 border-b border-aqua-mid/30 flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>

          {/* CLOSE BUTTON (mobile only) */}
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-6">
          <div className="flex flex-col gap-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)} // close on mobile click
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 p-4 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-aqua-mid shadow-lg scale-105"
                        : "hover:bg-aqua-mid/30 hover:translate-x-1"
                    }
                    `
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}

          </div>
        </nav>

        {/* LOGOUT */}
        <div className="p-6 border-t border-aqua-mid/30">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full p-4 rounded-xl bg-red-500/80 hover:bg-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;