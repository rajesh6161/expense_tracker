// store.js
import { create } from "zustand";
import { fetchAllData } from "../utils/supabase";

// Create your store
const useExpenseStore = create((set) => ({
  loading: true,
  txnData: [],
  filteredTxnData: [],
  setFilteredTxnData: (data) => {
    set({ filteredTxnData: data });
  },
  fetchExpenseData: async () => {
    fetchAllData()
      .then((res) => {
        set({ txnData: res, loading: false });
      })
      .catch((err) => console.log(err));
  },
}));

export default useExpenseStore;
