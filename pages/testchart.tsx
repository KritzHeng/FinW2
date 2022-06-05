import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";

const data = [
  { time: "2019-04-11", value: 80.01 },
  { time: "2019-04-12", value: 96.63 },
  //... skipped ...
  { time: "2019-04-20", value: 74.43 }
];

const Chart = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = createChart(chartRef.current, { width: 200, height: 200 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(data);
  }, []);

  return <div ref={chartRef} />;
};

export default Chart;