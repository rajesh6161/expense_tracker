import React, { useState } from "react";
import TxnHistoryCard from "./TxnHistoryCard";
import { Button } from "flowbite-react";
import AddExpense from "./AddExpense";
import { FaChevronLeft } from "react-icons/fa";
import MonthChooser from "./MonthPicker";
import Loader from "../Loader";
import useExpenseStore from "@/app/store/expenseStore";

const TxnHistoryContainer = ({ selectedMonthData, setSelectedMonthData }) => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const { loading, filteredTxnData } = useExpenseStore();
  console.log(filteredTxnData.sort((a, b) => a.expense_date - b.expense_date));
  return (
    <div className="rounded-md border p-3">
      <div className="relative z-50 flex h-16 items-center justify-between bg-gray-100 p-5">
        <p>Transaction History</p>
        {!showAddExpense ? (
          <Button onClick={() => setShowAddExpense(!showAddExpense)}>
            Add Expense
          </Button>
        ) : (
          <Button onClick={() => setShowAddExpense(!showAddExpense)}>
            <FaChevronLeft />
          </Button>
        )}
      </div>
      {showAddExpense ? (
        <AddExpense selectedMonthData={selectedMonthData} />
      ) : (
        <>
          <div className="flex justify-between pt-4">
            <MonthChooser
              selectedMonthData={selectedMonthData}
              setSelectedMonthData={setSelectedMonthData}
            />
            <p className="mt-2 text-lg">
              Total Expenditure:{" "}
              <strong className="bg-red-300 p-1">
                &#8377;
                {filteredTxnData.length
                  ? filteredTxnData.reduce((a, c) => a + c.amount, 0)
                  : 0}
              </strong>
            </p>
          </div>
          <div className="h-[700px] overflow-scroll">
            {loading ? (
              <Loader />
            ) : filteredTxnData.length ? (
              filteredTxnData.map((el) => (
                <TxnHistoryCard key={el.id} data={el} />
              ))
            ) : (
              <p>No Transactions Yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TxnHistoryContainer;
