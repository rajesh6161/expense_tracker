const formatDateTime = (timestampString) => {
  const timestamp = new Date(timestampString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  return timestamp.toLocaleString("en-US", options);
};

function filterExpensesByMonthAndYear(data, month, year) {
  // Convert month to two digits format if it's a single digit
  const monthString = month < 10 ? "0" + month : "" + month;

  // Filter the data array based on the provided month and year
  const filteredData = data.filter((expense) => {
    const expenseDate = new Date(expense.expense_date);
    const expenseMonth = expenseDate.getMonth() + 1; // getMonth() returns 0-indexed month
    const expenseYear = expenseDate.getFullYear();
    return expenseMonth === month && expenseYear === year;
  });

  return filteredData;
}

// for use in ExpenseTrend and TopExpenditures
const modifyAndMergeData = (txnData) => {
  const modifiedData = txnData.map((el) => {
    return {
      id: el.category.category,
      label: el.category.category,
      value: el.amount,
      icon: el.category.icon,
    };
  });

  const mergedData = [];
  const mergedIds = [];

  modifiedData.forEach((item) => {
    if (!mergedIds.includes(item.id)) {
      const sumValues = modifiedData.reduce((acc, curr) => {
        if (curr.id === item.id) {
          return acc + curr.value;
        } else {
          return acc;
        }
      }, 0);
      mergedData.push({ ...item, value: sumValues });
      mergedIds.push(item.id);
    }
  });
  return mergedData;
};

// function to calculate three top most expenditure categories of that month
const topExpenditures = (txnData) => {
  const data = modifyAndMergeData(txnData);
  if (data.length >= 3) {
    return data.sort((a, b) => b.value - a.value).slice(0, 3);
  }
  return data;
};

export {
  formatDateTime,
  filterExpensesByMonthAndYear,
  topExpenditures,
  modifyAndMergeData,
};
