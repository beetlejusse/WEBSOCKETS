import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <motion.div
        className="text-center space-y-6 backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex justify-center gap-4 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            <div
              className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center
             justify-center shadow-lg"
            >
              <MessageSquare className="w-10 h-10 text-slate-300" />
            </div>
          </div>
        </motion.div>
        <motion.h2
          className="text-3xl font-extrabold text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to <span className="text-primary">Chat-A WEBSOCKET APP</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Select a conversation from the sidebar to start chatting.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="w-4 h-4 bg-primary rounded-full mx-auto"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;
