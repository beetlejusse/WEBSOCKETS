import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare,
  User,
  Mail,
  EyeOff,
  Eye,
  Loader2,
  Lock,
  Phone,
} from "lucide-react";
import AuthImagePattern from "@/components/custom components/AuthImagepattern";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";

export const AuthSignUpPage = () => {
  const { isSigningUp, signUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const { toast } = useToast();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast({ variant: "destructive", title: "Full name is required" });
    if (!formData.email.trim())
      return toast({ variant: "destructive", title: "Email is required" });
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast({ variant: "destructive", title: "Invalid email format" });
    if (!formData.password)
      return toast({ variant: "destructive", title: "Password is required" });
    if (formData.password.length < 6)
      return toast({
        variant: "destructive",
        title: "Password must be at least 6 characters",
      });
    if (formData.contactNumber.length < 10)
      return toast({
        variant: "destructive",
        title: "Contast number must be at least 10 characters",
      });

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateForm();
    if (res) signUp(formData);
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
    blur: { scale: 1 },
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2  bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center p-6 sm:p-12"
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-center mb-8"
          >
            <div className="flex flex-col items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors border border-slate-400"
              >
                <MessageSquare className="size-6 text-slate-400 text-primary" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mt-2 text-slate-400"
              >
                Create Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base-content/60"
              >
                Get started with your free account
              </motion.p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="form-control"
              variants={inputVariants}
              whileHover="focus"
              whileTap="blur"
            >
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 text-white"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </motion.div>

            <motion.div
              className="form-control"
              variants={inputVariants}
              whileHover="focus"
              whileTap="blur"
            >
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 text-white"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </motion.div>

            <motion.div
              className="form-control"
              variants={inputVariants}
              whileHover="focus"
              whileTap="blur"
            >
              <label className="label">
                <span className="label-text font-medium">Phone</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="size-5 text-base-content/40" />
                </div>
                <input
                  type="string"
                  className="input input-bordered w-full pl-10 text-white"
                  placeholder="1234567890"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumber: e.target.value })
                  }
                />
              </div>
            </motion.div>

            <motion.div
              className="form-control"
              variants={inputVariants}
              whileHover="focus"
              whileTap="blur"
            >
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 text-white"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <motion.button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </motion.form>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-base-content/60">
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" className="link link-primary">
                  Sign in
                </Link>
              </motion.span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthImagePattern
          title="CHAT-A WEBSOCKET APP"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </motion.div>
    </div>
  );
};
