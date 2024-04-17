// store.js
import { create } from "zustand";
import { addExpenseData } from "../utils/supabase";
// Create your store
const useAddExpenseStore = create((set) => ({
  loadingAddExpense: false,
  expenseAdded: false,
  addExpenseData: async (expenseData) => {
    set({ loadingAddExpense: true });
    addExpenseData(expenseData)
      .then(
        (res) =>
          res.length && set({ expenseAdded: true, loadingAddExpense: false }),
      )
      .catch((err) => console.log(err));
  },
}));

export default useAddExpenseStore;
