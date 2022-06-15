import type { NextPage } from "next";
import "tailwindcss/tailwind.css";
import { useEffect, useRef, useState } from "react";

type CurrencyPairs = {
  [key: string]: CurrenciesDetail;
};

type CurrenciesDetail = {
  // uuid?: string;
  token1: string;
  token2: string;
};
type data = {
  price: number;
  amoust: number;
  total: number;
};
// type Amount = {
//   amount: number;
// };
// enum OrderType {Buy,Sell}

type OrderDetails = {
  orderID: string;
  orderDate: string;
  symbol: string;
  type: string;
  price: number;
  input: number;
  output: number;
};
const trade = () => {
  const [inputToken1, setInputToken1] = useState("");
  const [inputToken2, setInputToken2] = useState("");
  const [inputAmount, setInputAmount] = useState();
  const [dataListObject, setDataListObject] = useState<CurrencyPairs>({});
  const [orderList, setOrderList] = useState<OrderDetails[]>([]);
  useEffect(() => {
    const interval = setInterval(async () => {
      if (dataListObject.symbol !== undefined) {
        const ob = {
          symbol: `${dataListObject.symbolToken1}_${dataListObject.symbolToken2}`,
          symbolToken1: dataListObject.symbolToken1,
          symbolToken2: dataListObject.symbolToken2,
          asks: [],
          bids: [],
        };
        const resBINANCE = await fetch(
          `/api/binanceOrderbook?symbol1=${dataListObject.symbolToken1}&symbol2=${dataListObject.symbolToken2}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .catch((error) => console.warn(error));

        // console.log(resBINANCE.data);
        await Object.keys(resBINANCE.data).map(function (key, index) {
          if (key === "asks") {
            Object.keys(resBINANCE.data[key]).map(function (item) {
              const data = {
                price: Object.values(resBINANCE.data[key][item])[0],
                amount: Object.values(resBINANCE.data[key][item])[1],
                total:
                  Object.values(resBINANCE.data[key][item])[0] *
                  Object.values(resBINANCE.data[key][item])[1],
              };
              ob.asks.push(data);
              // console.log("bids if: ", item);
            });
          } else if (key === "bids") {
            Object.keys(resBINANCE.data[key]).map(function (item) {
              const data = {
                price: Object.values(resBINANCE.data[key][item])[0],
                amount: Object.values(resBINANCE.data[key][item])[1],
                total:
                  Object.values(resBINANCE.data[key][item])[0] *
                  Object.values(resBINANCE.data[key][item])[1],
              };
              ob.bids.push(data);
            });
          }
          // return
        });
        setDataListObject(ob);
      } else {
        // console.log("Error");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dataListObject]);

  const getData = async () => {
    console.log("orderList:", orderList.length);
    console.log("orderList:", orderList);
  };
  const fetchBinance = async () => {
    if (inputToken1 !== "" && inputToken2 !== "") {
      const ob = {
        symbol: `${inputToken1}_${inputToken2}`,
        symbolToken1: inputToken1,
        symbolToken2: inputToken2,
        asks: [],
        bids: [],
      };
      const resBINANCE = await fetch(
        `/api/binanceOrderbook?symbol1=${inputToken1}&symbol2=${inputToken2}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .catch((error) => console.warn(error));

      console.log(resBINANCE.data);
      await Object.keys(resBINANCE.data).map(function (key, index) {
        if (key === "asks") {
          Object.keys(resBINANCE.data[key]).map(function (item) {
            const data = {
              price: Object.values(resBINANCE.data[key][item])[0],
              amount: Object.values(resBINANCE.data[key][item])[1],
              total:
                Object.values(resBINANCE.data[key][item])[0] *
                Object.values(resBINANCE.data[key][item])[1],
            };
            ob.asks.push(data);
            // console.log("bids if: ", item);
          });
        } else if (key === "bids") {
          Object.keys(resBINANCE.data[key]).map(function (item) {
            const data = {
              price: Object.values(resBINANCE.data[key][item])[0],
              amount: Object.values(resBINANCE.data[key][item])[1],
              total:
                Object.values(resBINANCE.data[key][item])[0] *
                Object.values(resBINANCE.data[key][item])[1],
            };
            ob.bids.push(data);
          });
        }
        // return
      });
      setDataListObject(ob);

      // console.log(ob);
      console.log(dataListObject);
    }
  };

  const buySummit = async () => {
    // console.log(inputAmount);
    try {
      if (dataListObject.symbol !== undefined) {
        const ob = {
          symbol: `${dataListObject.symbolToken1}_${dataListObject.symbolToken2}`,
          symbolToken1: dataListObject.symbolToken1,
          symbolToken2: dataListObject.symbolToken2,
          asks: [],
          bids: [],
        };
        const resBINANCE = await fetch(
          `/api/binanceOrderbook?symbol1=${dataListObject.symbolToken1}&symbol2=${dataListObject.symbolToken2}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .catch((error) => console.warn(error));

        // console.log(resBINANCE.data);
        await Object.keys(resBINANCE.data).map(function (key, index) {
          if (key === "asks") {
            Object.keys(resBINANCE.data[key]).map(function (item) {
              const data = {
                price: Object.values(resBINANCE.data[key][item])[0],
                amount: Object.values(resBINANCE.data[key][item])[1],
                total:
                  Object.values(resBINANCE.data[key][item])[0] *
                  Object.values(resBINANCE.data[key][item])[1],
              };
              ob.asks.push(data);
            });
          }
        });
        console.log(resBINANCE);
        let index = 0;
        const cost = inputAmount;
        let tokenTotal: number = 0;
        while (cost > 0) {
          const element = ob.asks[index];
          const usdtTotal: Number = element.price * element.amount;
          console.log(usdtTotal);
          console.log("cost: ", cost);
          if (Number(cost) >= Number(usdtTotal)) {
            cost = cost - usdtTotal;
            tokenTotal = tokenTotal + Number(element.amount);
            console.log("cost: ", cost);
            console.log("element.amount: ", element.amount);
            console.log("tokenTotal: ", tokenTotal);
          } else if (cost < usdtTotal) {
            tokenTotal += cost * (Number(element.amount) / usdtTotal);
            cost = 0;
            console.log("final btc: " + tokenTotal);
          }
          index = index + 1;
        }
        console.log(orderList.length);
        const s = {
          orderID: "#" + String(orderList.length + 1),
          orderDate: new Date(Date.now())
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace("-", "/")
            .replace("-", "/"),
          symbol: dataListObject.symbol,
          type: "Buy",
          price: 40000,
          input: inputAmount,
          output: tokenTotal,
        };
        console.log(...orderList);
        const mappingData = orderList.map((e) => {
          return e;
        });
        mappingData.push(s);
        setOrderList(mappingData);
        console.log(mappingData);
      } else {
        console.log("symbol not found");
      }
    } catch (error) {}
  };
  const sellSummit = async () => {
    try {
      if (dataListObject.symbol !== undefined) {
        const ob = {
          symbol: `${dataListObject.symbolToken1}_${dataListObject.symbolToken2}`,
          symbolToken1: dataListObject.symbolToken1,
          symbolToken2: dataListObject.symbolToken2,
          asks: [],
          bids: [],
        };
        const resBINANCE = await fetch(
          `/api/binanceOrderbook?symbol1=${dataListObject.symbolToken1}&symbol2=${dataListObject.symbolToken2}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .catch((error) => console.warn(error));
        await Object.keys(resBINANCE.data).map(function (key, index) {
          if (key === "bids") {
            Object.keys(resBINANCE.data[key]).map(function (item) {
              const data = {
                price: Object.values(resBINANCE.data[key][item])[0],
                amount: Object.values(resBINANCE.data[key][item])[1],
                total:
                  Object.values(resBINANCE.data[key][item])[0] *
                  Object.values(resBINANCE.data[key][item])[1],
              };
              ob.bids.push(data);
              // console.log("bids if: ", item);
            });
          }
        });
        console.log(resBINANCE);
        let index = 0;
        const cost = inputAmount;
        let tokenTotal: number = 0;
        while (cost > 0) {
          const element = ob.bids[index];
          const usdtTotal: Number = element.price * element.amount;
          // console.log(usdtTotal);
          // console.log("cost: ", cost);
          if (Number(cost) >= Number(usdtTotal)) {
            cost = cost - usdtTotal;
            tokenTotal = tokenTotal + Number(element.amount);
            console.log("cost: ", cost);
            console.log("element.amount: ", element.amount);
            console.log("tokenTotal: ", tokenTotal);
          } else if (cost < usdtTotal) {
            tokenTotal += cost * (Number(element.amount) / usdtTotal);
            cost = 0;
          }
          index = index + 1;
        }
        console.log(orderList.length);
        const s = {
          orderID: "#" + String(orderList.length + 1),
          orderDate: new Date(Date.now())
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")
            .replace("-", "/")
            .replace("-", "/"),
          symbol: dataListObject.symbol,
          type: "Sell",
          price: 40000,
          input: inputAmount,
          output: tokenTotal,
        };
        console.log(...orderList);
        const mappingData = orderList.map((e) => {
          return e;
        });
        mappingData.push(s);
        setOrderList(mappingData);
        console.log(mappingData);
      } else {
        console.log("symbol not found");
      }
    } catch (error) {}
  };

  return (
    <div className="px-4">
      <div>
        <p className="text-black font-bold text-3xl py-2 px-5 rounded">
          <b>Trade</b>
        </p>
      </div>
      <div>
        <p>Token1</p>
      </div>
      <div>
        <input
          className=" bg-white-300  border border-solid border-gray-500 "
          type="text"
          onChange={(x) => setInputToken1(x.target.value)}
        ></input>
      </div>
      <div>
        <p>Token2</p>
      </div>
      <div>
        <input
          className=" bg-white-300  border border-solid border-gray-500"
          type="text"
          onChange={(a) => setInputToken2(a.target.value)}
        ></input>
      </div>
      <div>
        <br></br>
        <button
          className=" bg-white-300  border border-solid border-gray-500"
          type="button"
          onClick={(e) => fetchBinance()}
        >
          {" "}
          fetch
        </button>
      </div>
      {/* <button type="button" onClick={(e) => getData()}>
        {" "}
        getData
      </button> */}
      <h2 className="text-black font-bold text-3xl py-2 px-5 rounded">
        <b>Asks</b>
      </h2>
      <br></br>
      <div>
        <a className="px-14 py-3">Price (USDT)</a>
        <a className="px-14 py-3">Amount (BTC)</a>
        <a className="px-14 py-3">Total </a>
      </div>
      <br></br>
      <div>
        {Object.keys(dataListObject).length >= 1
          ? Object.values(dataListObject["asks"]).map((item, index) => {
              if (index < 5) {
                return (
                  <div key={index}>
                    <a className="px-8 py-3">{item.price}</a>
                    <a className="px-8 py-3">{item.amount}</a>
                    <a className="px-8 py-3">{item.total}</a>
                  </div>
                );
              }
            })
          : "no items"}
      </div>
      <h2>
        <b className="text-black font-bold text-3xl py-2 px-5 rounded">Bids</b>
      </h2>
      <br></br>
      <div>
        <a className="px-14 py-3">Price (USDT)</a>
        <a className="px-14 py-3">Amount (BTC)</a>
        <a className="px-14 py-3">Total </a>
      </div>
      <br></br>
      <div>
        {Object.keys(dataListObject).length >= 1
          ? Object.values(dataListObject["bids"]).map((item, index) => {
              if (index < 5) {
                return (
                  <div key={index}>
                    <a className="px-8 py-3">{item.price}</a>
                    <a className="px-8 py-3">{item.amount}</a>
                    <a className="px-8 py-3">{item.total}</a>
                  </div>
                );
              }
            })
          : "no items"}
      </div>
      <div>
        <a>Amount</a>
      </div>
      <div>
        <input
          className=" bg-white-300  border border-solid border-gray-500"
          type="number"
          onChange={(u) => setInputAmount(u.target.value)}
        ></input>
      </div>
      <br></br>
      <div className="flex">
        <button
          className=" px-4 bg-white-300  border border-solid border-gray-500"
          type="button"
          onClick={(e) => buySummit()}
        >
          {" "}
          buy
        </button>

        <button
          className=" px-4 bg-white-300  border border-solid border-gray-500"
          type="button"
          onClick={(e) => sellSummit()}
        >
          {" "}
          sell
        </button>
      </div>

      <br></br>
      <h2 className="text-black font-bold text-3xl py-2 px-5 rounded">
        <b>Order history</b>
      </h2>
      <div className="flex rounded-lg ">
        <p className="px-4">Order</p>
        <p className="px-4">Data</p>
        <p className="px-10"></p>
        <p className="px-12">Symbol</p>
        <p className="px-4">Type</p>
        <p className="px-4">Price</p>
        <p className="px-12">Input</p>
        <p>Output</p>
      </div>
        <br></br>
      <div>
        {orderList.length >= 1
          ? orderList.map((item, index) => {
              return (
                <div key={index}>
                  <a className="px-6 py-3">{item.orderID}</a>
                  <a className="px-6 py-3">{item.orderDate}</a>
                  <a className="px-6 py-3">{item.symbol}</a>
                  <a className="px-6 py-3">{item.type}</a>
                  <a className="px-6 py-3">{item.price}</a>
                  <a className="px-6 py-3">{item.input}</a>
                  <a className="px-6 py-3">{item.output}</a>
                  <br></br>
                  <br></br>
                </div>
              );
            })
          : "no item"}
      </div>
    </div>
  );
};
export default trade;
