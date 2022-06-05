import type { NextPage } from "next";
import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import { createChart } from "lightweight-charts";

// type TTodo = {
//   token1: string;
//   token2: string;
// };
type InputToken = { token1: string; token2: string };

const chart = () => {
  // const [form, setForm] = useState<InputToken>({ token1: "", token2: "" });
  // const chartOptions = {
  //   layout: {
  //     textColor: "black",
  //     background: { type: "solid", color: "white" },
  //   },
  // };
  // const chart = createChart(document.getElementById("container"), chartOptions);
  // const candlestickSeries = chart.addCandlestickSeries({
  //   upColor: "#26a69a",
  //   downColor: "#ef5350",
  //   borderVisible: false,
  //   wickUpColor: "#26a69a",
  //   wickDownColor: "#ef5350",
  // });

  // const data = [
  //   { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
  //   { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
  //   { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
  //   { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
  //   { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
  //   { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
  //   { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
  //   { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
  //   { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
  //   { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
  // ];

  // candlestickSeries.setData(data);

  // chart.timeScale().fitContent();
  // const [data, setData] = useState<TTodo[]>([]);

  // // const firstChart = createChart(firstContainer);
  // // const secondChart = createChart(secondContainer);
  // const chart = createChart(container);

  // const areaSeries = chart.addAreaSeries();
  // areaSeries.setData([
  //   { time: "2018-12-22", value: 32.51 },
  //   { time: "2018-12-23", value: 31.11 },
  //   { time: "2018-12-24", value: 27.02 },
  //   { time: "2018-12-25", value: 27.32 },
  //   { time: "2018-12-26", value: 25.17 },
  //   { time: "2018-12-27", value: 28.89 },
  //   { time: "2018-12-28", value: 25.46 },
  //   { time: "2018-12-29", value: 23.92 },
  //   { time: "2018-12-30", value: 22.68 },
  //   { time: "2018-12-31", value: 22.67 },
  // ]);

  // const candlestickSeries = chart.addCandlestickSeries();
  // candlestickSeries.setData([
  //   { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
  //   { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
  //   { time: "2018-12-24", open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
  //   { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
  //   { time: "2018-12-26", open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
  //   { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
  //   {
  //     time: "2018-12-28",
  //     open: 111.51,
  //     high: 142.83,
  //     low: 103.34,
  //     close: 131.25,
  //   },
  //   {
  //     time: "2018-12-29",
  //     open: 131.33,
  //     high: 151.17,
  //     low: 77.68,
  //     close: 96.43,
  //   },
  //   { time: "2018-12-30", open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
  //   {
  //     time: "2018-12-31",
  //     open: 109.87,
  //     high: 114.69,
  //     low: 85.66,
  //     close: 111.26,
  //   },
  // ]);

  // chart.timeScale().fitContent();

  // เปลี่ยนเป็นuseeffect แล้วใช้interval
  const getData = async () => {
    // e.preventDefault();
    try {
      // const res = await axios.get("http://localhost:3000/");
      // setData(res.data);
      // console.log(res.data);
      console.log("getData");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //  get ข้อมูล เพื่อเช็คคู่tokenซ้ำ(ไม่เขียนเพิ่ม)

  const handleSubmit = async () => {
    try {
      console.log(form.token1);
      console.log(form.token2);
      let resBinance = await fetch(
        `https://api1.binance.com/api/v3/klines?interval=1h&symbol=${form.token1.toUpperCase()}${form.token2.toUpperCase()}`
      );
      let dataBinance = await resBinance.json();
      console.log(dataBinance);
      let ob = {};
      dataBinance.forEach((item) => {
        const result = {
          openTime: new Date(item[0])
            .toISOString()
            .slice(0, 10)
            .replace("T", " "),
          // ยังไม่ได้แปลงเวลา
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        };
        Object.assign(ob, result);
      });

      console.log(ob);
      // setData([
      //   ...data,
      //   {
      //     token1: form.token1,
      //     token2: form.token2,
      //   },
      // ]);

      // setData(res)
      // await getData();
    } catch (error) {}
  };
  return (
    <div>
      <div className="text-black font-bold text-3xl py-2 px-5 rounded">
        Chart
      </div>

      <div id="chart"></div>
      <form
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
      >
        <div className="px-5">
          <a>Token 1</a>
        </div>
        {/* ???? size with input */}

        <div className="px-5">
          <input
            className="border-solid border-2 border-gray-400/100 px-10"
            type="string"
            value={form.token1}
            onChange={(e) => setForm({ ...form, token1: e.target.value })}
            required
          ></input>
        </div>
        <div className="px-5">
          <a>Token 2</a>
        </div>
        <div className="px-5">
          <input
            type="string"
            className="border-solid border-2 border-gray-400/100 px-10"
            value={form.token2}
            onChange={(e) => setForm({ ...form, token2: e.target.value })}
            required
          ></input>
        </div>
        <div className="px-5 py-3">
          <button
            className="border-solid border-2 border-gray-400/100 px-10"
            type="submit"
            value="update"
          >
            Fetch
          </button>
        </div>
      </form>
      {/* <div id="container"></div> */}
    </div>
  );
};
export default chart;
