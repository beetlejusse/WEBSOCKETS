import { X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-base-content">
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser._id)
                  ? "text-success"
                  : "text-base-content/70"
              }`}
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 text-base-content/70 hover:text-error hover:bg-error/10 rounded-full transition"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
