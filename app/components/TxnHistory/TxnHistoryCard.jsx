import { formatDateTime } from "@/app/utils/helpers";
const TxnHistoryCard = ({ data: { amount, category, expense_date, note } }) => {
  return (
    <div className="mb-1 flex items-center justify-between rounded-md border border-b-zinc-300 bg-white p-4">
      <div className="flex items-center space-x-3">
        <span className="rounded-md border border-black p-1 text-3xl">
          {category.icon}
        </span>
        <div className="flex flex-col">
          <p className="flex items-center gap-3">
            {note}{" "}
            <span className="rounded-md bg-blue-300 px-1 text-xs">
              {category.category}
            </span>
          </p>
          <span className="text-xs">{formatDateTime(expense_date)}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <p>&#8377;{amount}</p>
      </div>
    </div>
  );
};

export default TxnHistoryCard;
