import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-gradient-to-r from-blue-600 to-purple-600 border-b border-blue-700 fixed w-full top-0 z-40 
    backdrop-blur-lg backdrop-filter bg-opacity-95 shadow-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
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
                  <button
                    className="btn btn-sm btn-accent gap-2 transition-transform transform hover:scale-105"
                    title="View Profile"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ul className="py-2 text-gray-700">
                      <li>
                        <Link
                          to={"/profile"}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/settings"}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                      </li>
                    </ul>
                  </div>
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
