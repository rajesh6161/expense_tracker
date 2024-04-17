import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import { modifyAndMergeData } from "../utils/helpers";
import Loader from "./Loader";
import useExpenseStore from "../store/expenseStore";
import { AgChartsReact } from "ag-charts-react";

const ExpenseTrend = () => {
  const { loading, filteredTxnData } = useExpenseStore();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(modifyAndMergeData(filteredTxnData));
  }, [loading, filteredTxnData]);

  useEffect(() => {
    setOptions({ ...options, data: data });
  }, [data]);

  const [options, setOptions] = useState({
    data: [],
    title: {
      text: "Expense Trend",
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "label",
        angleKey: "value",
        innerRadiusRatio: 0.9,
        innerLabels: [
          {
            text: "Total Investment",
            fontWeight: "bold",
          },
          {
            text: "$100,000",
            margin: 4,
            fontSize: 48,
            color: "green",
          },
        ],
        innerCircle: {
          fill: "#c9fdc9",
        },
      },
    ],
  });
  return (
    <div className="flex h-[600px] items-center justify-center bg-neutral-100">
      {loading ? (
        <Loader />
      ) : data.length ? (
        <NiChart data={data} />
      ) : (
        // <RChart options={options} />
        <p>No Data Yet</p>
      )}
    </div>
  );
};

const NiChart = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "asd",
          },
          id: "dots",
        },
        {
          match: {
            id: "qwe",
          },
          id: "lines",
        },
        {
          match: {
            id: "Food",
          },
          id: "lines",
        },
      ]}
    />
  );
};

const RChart = ({ options }) => {
  return (
    <div className="">
      <AgChartsReact autoSize="false" options={options} />
    </div>
  );
};

export default ExpenseTrend;
