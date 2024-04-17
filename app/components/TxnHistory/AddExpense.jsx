import useCategoryStore from "@/app/store/categoriesStore";
import { Button, Datepicker, TextInput, Modal } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Loader from "../Loader";
import useAddExpenseStore from "@/app/store/addExpenseStore";
import useExpenseStore from "@/app/store/expenseStore";
import useAuthStore from "@/app/store/authStore";

const AddExpense = ({ selectedMonthData }) => {
  const { loadingCategory, fetchCategories, categoryAdded, categoryDeleted } =
    useCategoryStore();
  const { loadingAddExpense, addExpenseData } = useAddExpenseStore();
  const { fetchExpenseData } = useExpenseStore();
  const { currentUser } = useAuthStore();
  useEffect(() => {
    fetchCategories();
  }, [loadingCategory, categoryAdded, categoryDeleted]);
  const current_date = new Date().getDate();
  const [expenseData, setExpenseData] = useState({
    expense_date: new Date(
      selectedMonthData.year,
      selectedMonthData.month - 1,
      current_date,
    ),
    amount: "",
    category: "",
    note: "",
  });
  const setData = () => {
    expenseData["userid"] = currentUser.id;
    addExpenseData(expenseData);
  };
  useEffect(() => {
    setExpenseData({
      expense_date: new Date(
        selectedMonthData.year,
        selectedMonthData.month - 1,
        current_date,
      ),
      amount: "",
      category: "",
      note: "",
    });
    fetchExpenseData();
  }, [loadingAddExpense]);
  return (
    <div className="space-y-3 pt-2">
      <Datepicker
        minDate={new Date(2024, 0, 1)}
        defaultDate={
          new Date(
            selectedMonthData.year,
            selectedMonthData.month - 1,
            current_date,
          )
        }
        maxDate={new Date(2024, 11, current_date)}
        onSelectedDateChanged={(val) => {
          const formattedDate = val.toISOString().slice(0, 19) + "+00";
          setExpenseData({
            ...expenseData,
            expense_date: formattedDate,
          });
        }}
      />
      <TextInput
        value={expenseData.amount}
        placeholder="Amount"
        type="number"
        onChange={(e) =>
          setExpenseData({
            ...expenseData,
            amount: e.target.value,
          })
        }
      />
      <TextInput
        value={expenseData.note}
        placeholder="Note"
        onChange={(e) =>
          setExpenseData({
            ...expenseData,
            note: e.target.value,
          })
        }
      />
      <SelectCategory
        setExpenseData={setExpenseData}
        expenseData={expenseData}
      />
      <Button onClick={() => setData()} className="w-full">
        {loadingAddExpense ? <Loader h={20} w={20} color="white" /> : "Save"}
      </Button>
    </div>
  );
};

const SelectCategory = ({ setExpenseData, expenseData }) => {
  const { loadingCategory, categories, deleteCategory } = useCategoryStore();
  return (
    <div className="flex max-h-[200px] flex-wrap gap-3 rounded-md border p-3">
      {loadingCategory ? (
        <Loader />
      ) : (
        categories.map((el) => (
          <div className="flex items-center space-x-1">
            <p
              onClick={() => setExpenseData({ ...expenseData, category: el })}
              key={el.id}
              className={`flex cursor-pointer items-center text-sm ${expenseData.category.id === el.id ? "bg-blue-400" : "bg-blue-200"} rounded-full px-4 py-1 hover:bg-blue-400`}
            >
              {el.category}&nbsp;{el.icon}
            </p>
            <FaTimes
              className="cursor-pointer text-xs"
              onClick={() => deleteCategory(el.id)}
            />
          </div>
        ))
      )}
      <AddNewCategory />
    </div>
  );
};

const AddNewCategory = () => {
  const { addNewCategory, categoryAdded, addCategoryLoading } =
    useCategoryStore();
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");

  const saveCategory = () => {
    addNewCategory(category, icon);
  };

  useEffect(() => {
    setOpenModal(false);
    setCategory("");
    setIcon("");
  }, [categoryAdded]);

  return (
    <>
      <Button size="xs" pill onClick={() => setOpenModal(true)}>
        Add New Category &nbsp;
        <FaPlus />
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="flex space-x-1">
          <TextInput
            className="w-full"
            value={category}
            placeholder="Category Name"
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextInput
            className="w-full"
            value={icon}
            placeholder="Choose Icon"
            onChange={(e) => setIcon(e.target.value)}
          />
          <Button onClick={() => saveCategory()}>
            {!addCategoryLoading ? (
              "Save"
            ) : (
              <Loader h={20} w={20} color="white" />
            )}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddExpense;
