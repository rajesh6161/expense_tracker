const TopTxnCard = ({ txn }) => {
  return (
    <div className="border-neutal-200 relative flex w-full items-center overflow-hidden rounded-md border bg-white p-3 md:p-6">
      <div className="flex flex-col">
        <p className="text-sm md:text-lg">{txn.label}</p>
        <p className="text-sm font-bold md:text-lg">&#8377;{txn.value}</p>
      </div>
      <p className="absolute -bottom-3 right-1 text-4xl text-neutral-300 md:text-8xl">
        {txn.icon}
      </p>
    </div>
  );
};

export default TopTxnCard;
