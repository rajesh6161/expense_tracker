import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jmvpxkwzkanninnazmdq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdnB4a3d6a2FubmlubmF6bWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNTI1MjAsImV4cCI6MjAyNTgyODUyMH0.gtSdUgAZeBMefTtLWRiMs1iig6Y_wz9FmOvJ79Xec8Y";
const supabase = createClient(supabaseUrl, supabaseKey);

// get all data
const fetchAllData = async () => {
  try {
    let { data, error } = await supabase
      .from("budget_tracker")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return "Error fetching data";
  }
};

const addExpenseData = async (expense_data) => {
  try {
    const { data, error } = await supabase
      .from("budget_tracker")
      .insert([expense_data])
      .select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error saving expense data:", error.message);
    return "Error occurred while saving the expense data!";
  }
};

// add a new category
const addNewCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([category])
      .select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error adding new category:", error.message);
    return "Error occurred while adding the new category!";
  }
};

// add a new category
const getAllCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return "Error occurred while fetching categories!";
  }
};

const deleteCategory = async (id) => {
  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    return error;
  }
};

// authentication
const registerUser = async (user_data) => {
  let {
    data: { user, session },
    error,
  } = await supabase.auth.signUp(user_data);
  console.log("user", user, "error", error);
  if (error) {
    throw error;
  }
  return { user, session };
};
const loginUser = async (user_data) => {
  let { data, error } = await supabase.auth.signInWithPassword(user_data);
  if (error) {
    throw error;
  }
  return data;
};
const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return user;
};
const logoutUser = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
  return true;
};
export {
  fetchAllData,
  addExpenseData,
  addNewCategory,
  getAllCategories,
  deleteCategory,
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};
