import { useState } from "react";
import TopTxnCard from "./TopTxnCard";
import { useEffect } from "react";
import { topExpenditures } from "@/app/utils/helpers";
import useExpenseStore from "@/app/store/expenseStore";

const TopTransactionContainer = () => {
  const { filteredTxnData } = useExpenseStore();
  const [topExpenditureData, setTopExpenditureData] = useState([]);
  // set top expenditures data
  useEffect(() => {
    setTopExpenditureData(topExpenditures(filteredTxnData));
  }, [filteredTxnData]);
  return (
    <>
      <h3 className="text-lg font-semibold md:text-xl">My Top Transactions</h3>
      <div className="flex w-full gap-3">
        {topExpenditureData.map((el) => (
          <TopTxnCard key={el.id} txn={el} />
        ))}
      </div>
    </>
  );
};

export default TopTransactionContainer;
