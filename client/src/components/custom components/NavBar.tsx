import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className=" fixed w-full top-0 z-40 
    backdrop-blur-lg backdrop-filter bg-opacity-95 shadow-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-extrabold text-white tracking-wide">
                CHAT-A WEBSOCKET APP
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm btn-primary gap-2 transition-transform transform hover:scale-105
              `}
              title="Adjust your settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser ? (
              <>
                <div className="relative group">
                  <Link to={"/inspectProfile"} className="hidden sm:inline">
                    <button
                      className="btn btn-sm btn-accent gap-2 transition-transform transform hover:scale-105"
                      title="View Profile"
                    >
                      <User className="w-4 h-4" /> Profile
                    </button>
                  </Link>
                </div>
                <button
                  className="btn btn-sm btn-error gap-2 transition-transform transform hover:scale-105"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
