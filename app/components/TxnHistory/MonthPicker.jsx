import useExpenseStore from "@/app/store/expenseStore";
import { filterExpensesByMonthAndYear } from "@/app/utils/helpers";
import { useEffect, useState } from "react";
import { MonthInput, MonthPicker } from "react-lite-month-picker";

const MonthChooser = ({ selectedMonthData, setSelectedMonthData }) => {
  const { txnData, setFilteredTxnData } = useExpenseStore();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  useEffect(() => {
    const d = filterExpensesByMonthAndYear(
      txnData,
      selectedMonthData.month,
      selectedMonthData.year,
    );
    d.length ? setFilteredTxnData(d) : setFilteredTxnData([]);
  }, [selectedMonthData]);
  return (
    <>
      <MonthInput
        size="small"
        selected={selectedMonthData}
        setShowMonthPicker={setIsPickerOpen}
        showMonthPicker={isPickerOpen}
      />
      {isPickerOpen ? (
        <MonthPicker
          size="small"
          setIsOpen={setIsPickerOpen}
          selected={selectedMonthData}
          onChange={setSelectedMonthData}
        />
      ) : null}
    </>
  );
};

export default MonthChooser;
