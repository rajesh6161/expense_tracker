"use client";

import { useEffect, useState } from "react";
import ExpenseTrend from "./components/ExpenseTrend";
import TopTransactionContainer from "./components/TopTransaction";
import TxnHistoryContainer from "./components/TxnHistory";
import { filterExpensesByMonthAndYear } from "./utils/helpers";
import useExpenseStore from "./store/expenseStore";
import useAddExpenseStore from "./store/addExpenseStore";
import ExportHeader from "./components/ExportHeader";
import useAuthStore from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Home() {
  const { loading, txnData, fetchExpenseData, setFilteredTxnData } =
    useExpenseStore();
  const { loadingAddExpense } = useAddExpenseStore();
  const { currentUser } = useAuthStore();
  const date = new Date();
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

  useEffect(() => {
    fetchExpenseData();
    const filteredByUserId = txnData.filter(
      (txn) => txn.userid === currentUser.id,
    );
    const d = filterExpensesByMonthAndYear(
      filteredByUserId,
      selectedMonthData.month,
      selectedMonthData.year,
    );
    setFilteredTxnData(d);
  }, [loading, loadingAddExpense]);

  return (
    <ProtectedRoute>
      <main className="flex flex-col gap-5 p-3 md:flex-row md:p-5">
        <div className="flex h-full w-full flex-col gap-3">
          <TopTransactionContainer />
          <ExportHeader />
          <ExpenseTrend />
        </div>
        <div className="flex h-full w-[60%] flex-col">
          <TxnHistoryContainer
            loading={loading}
            txnData={txnData}
            setTxnData={setFilteredTxnData}
            selectedMonthData={selectedMonthData}
            setSelectedMonthData={setSelectedMonthData}
          />
        </div>
      </main>
    </ProtectedRoute>
  );
}
