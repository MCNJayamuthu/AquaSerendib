import React from "react";
import { Fish, MessageCircle, Map, LogOut } from "lucide-react";

interface Props {
  active: string;
  setActive: (view: string) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<Props> = ({ active, setActive, onLogout }) => {
  const menuItems = [
    { id: "fish", label: "Fish Management", icon: Fish },
    { id: "support", label: "Support Messages", icon: MessageCircle },
    { id: "roadmap", label: "Roadmap", icon: Map }
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-aqua-deep to-aqua-darker text-white h-screen flex flex-col shadow-2xl">
      <div className="p-8 border-b border-aqua-mid/30">
        <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-6">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`
                  flex items-center gap-3 p-4 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-aqua-mid shadow-lg scale-105"
                      : "hover:bg-aqua-mid/30 hover:translate-x-1"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
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
  );
};

export default AdminSidebar;
