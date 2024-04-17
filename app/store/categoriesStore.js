// store.js
import { create } from "zustand";
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
} from "../utils/supabase";

// Create your store
const useCategoryStore = create((set) => ({
  loadingCategory: false,
  addCategoryLoading: false,
  categories: [],
  categoryAdded: false,
  categoryDeleted: false,
  fetchCategories: async () => {
    getAllCategories()
      .then((res) => {
        set({ categories: res, loadingCategory: false });
      })
      .catch((err) => console.log(err));
  },
  addNewCategory: async (category, icon) => {
    set({ addCategoryLoading: true });
    addNewCategory({ category, icon })
      .then((res) => {
        res.length && set({ categoryAdded: true, addCategoryLoading: false });
      })
      .catch((err) => console.log(err));
  },
  deleteCategory: async (id) => {
    deleteCategory(id)
      .then((res) => res && set({ categoryDeleted: true }))
      .catch((err) => console.log(err));
  },
}));

export default useCategoryStore;
