import { Button } from "flowbite-react";
import useExpenseStore from "../store/expenseStore";

const ExportHeader = () => {
  const { txnData } = useExpenseStore();
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(txnData),
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };
  return (
    <div>
      <Button onClick={exportData}>Export JSON</Button>
    </div>
  );
};

export default ExportHeader;
