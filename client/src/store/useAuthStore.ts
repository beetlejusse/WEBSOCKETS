import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;

  checkAuth: () => void;
  signUp: (data: { fullName: string; email: string; password: string; contactNumber: string }) => void;
  logout: () => void;
  login: (data: { email: string; password: string; contactNumber: string }) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
    } catch (error: any) {
      console.error("Error in checkAuth:", error.message || error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Sign up a new user
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast({ title: "Account created successfully" });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup.";
      toast({ variant: "destructive", title: errorMessage });
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast({ title: "Logged out successfully" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred during logout",
      })
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast({ title: "Logged in successfully" });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during login.";
      toast({ variant: "destructive", title: errorMessage });
    }
  }
}));
