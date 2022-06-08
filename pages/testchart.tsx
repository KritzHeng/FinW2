import { createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";

const data = [
  { time: "2019-04-11", value: 80.01 },
  { time: "2019-04-12", value: 96.63 },
  //... skipped ...
  { time: "2019-04-20", value: 74.43 }
];

const Chart = () => {
  const token1 = "BTC";
  const token2 = "USDT";
  const [dataBinance, setDataBinance] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() =>{
      fetchBinance();
      // console.log(dataBinance[0]);
      const fTest = dataBinance.map((item) =>{
        // console.log("item2: ",item[1])
        // console.log("item1: ",item[0])
        // console.log("item3: ",item[2])
        // console.log(item)
        // console.log(item[0])
        const ob = {
          time: new Date(item[0]).toISOString().slice(0, 10),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }
        return ob
        
    })
    console.log(fTest)
    }, 2000);
    return () => clearInterval(interval);
  }, [dataBinance]);

const fetchBinance = async() =>{
  const resBinance = await fetch(
    `/api/binanceCandle?symbol1=${token1}&symbol2=${token2}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((response) => setDataBinance(response.data))
    .catch((error) => console.warn(error));
}


  
  // const chartRef = useRef(null);
  // useEffect(() => {
  //   const chart = createChart(chartRef.current, { width: 200, height: 200 });
  //   const lineSeries = chart.addLineSeries();
  //   lineSeries.setData(data);
  // }, []);

  // return <div ref={chartRef} />;
};

export default Chart;