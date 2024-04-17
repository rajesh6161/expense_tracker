import { create } from "zustand";
import { getCurrentUser, loginUser, registerUser } from "../utils/supabase";

const useAuthStore = create((set) => ({
  registeringUser: false,
  loggingInUser: false,
  currentUser: null,
  loadingCurrentUser: true,
  registerUser: async (user_data) => {
    set({ registeringUser: true });
    registerUser(user_data)
      .then((res) => {
        if (res.user) {
          set({ currentUser: res.user, registeringUser: false });
        }
      })
      .catch((err) => console.error(err));
  },
  loginUser: async (user_data) => {
    set({ logginInUser: true });
    loginUser(user_data)
      .then((res) => {
        console.log(res);
        if (res.user) {
          set({ currentUser: res.user, loggingInUser: false });
        }
      })
      .catch((err) => console.log(err));
  },
  getCurrentUser: async () => {
    getCurrentUser()
      .then((res) => set({ currentUser: res, loadingCurrentUser: false }))
      .catch((err) => {
        console.error(err);
      });
  },
}));

export default useAuthStore;
