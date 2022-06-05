import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { v4 as uuid } from "uuid";

type TTodo = {
  uuid?: string;
  token1: string;
  token2: string;
  binace: number;
  ftx: number;
  diff: number;
};
type InputToken = { token1: string; token2: string };

const market_diff = () => {
  const [tokenInput1, setTokenInput1] = useState("");
  const [tokenInput2, setTokenInput2] = useState("");
  const [dataList, setDataList] = useState<TTodo[]>([]);
  // use key made dataListObject can't get same key
  const [dataListObject, setDataListObject] = useState({});

  // const [dataList, setDataList] = useState<TTodo[]>([
  //   {
  //     uuid: "a-a",
  //     token1: "BTC",
  //     token2: "USDT",
  //     binace: 1000,
  //     ftx: 1,
  //     diff: 10,
  //   },
  //   {
  //     uuid: "b-b",
  //     token1: "BNB",
  //     token2: "USDT",
  //     binace: 500,
  //     ftx: 5,
  //     diff: 50,
  //   },
  // ]);
  // const [ftxData, setFtfData] = useState({});
  // const [binanceData, setBinanceData] = useState({});

// setDataListObject 
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");

      let savedDataList = window.localStorage.getItem("dataList");
      console.log(savedDataList);
      // console.log(savedDataList)
      if (savedDataList) {
        setDataListObject(JSON.parse(savedDataList))
        // localStorage.setItem("dataList", JSON.parse(...savedDataList)); ;
      } else {
        setDataListObject(JSON.parse("{}"));
        // localStorage.setItem("dataList", JSON.parse([])) ;
      }
      // 👉️ can use localStorage here
    } else {
      console.log("You are on the server");
      // 👉️ can't use localStorage
    }
  }, []);

// interval
  useEffect(() => {
    const interval = setInterval(() => {
        const a: TTodo[] = Promise.all(
          Object.keys(dataListObject).map(async (key, index) =>{
          // dataListObject.map(async (item) => {
            // console.log("localStorage", localStorage.getItem("dataList"));
            const resFTX = await fetch(
              `/api/ftx?symbol1=${dataListObject[key].token1}&symbol2=${dataListObject[key].token2}`,
              {
                method: "GET",
              }
            )
              .then((response) => response.json())
              .catch((error) => console.warn(error));
            const resBINANCE = await fetch(
              `/api/binance?symbol1=${dataListObject[key].token1}&symbol2=${dataListObject[key].token2}`,
              {
                method: "GET",
              }
            )
              .then((response) => response.json())
              .catch((error) => console.warn(error));
            const percent =
              ((resBINANCE.data.price - resFTX.data.result.price) /
                resFTX.data.result.price) *
              100;
            let ob = {
              uuid: dataListObject[key].uuid,
              // bnb_usdt
              token1: dataListObject[key].token1,
              token2: dataListObject[key].token2,
              binace: resBINANCE.data.price,
              ftx: resFTX.data.result.price,
              diff: percent,
            };
            const mappingData = {
              ...dataListObject,
              [`${dataListObject[key].token1}_${dataListObject[key].token2}`]: ob,
            };
            setDataListObject(mappingData);
            return ob;
          })
        ).then((data) => setDataList(data));
        console.log(dataListObject);
        // console.log(...dataList);
    }, 2000);
    return () => clearInterval(interval);
  }, [dataList]);

  // เปลี่ยนเป็นuseeffect แล้วใช้interval
  const getData = async () => {
    // e.preventDefault();
    try {
      // console.log(...dataList);
      console.log(dataListObject)

      // const res = await axios.get("http://localhost:3000/");
      // setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (uuid: string) => {
    try {
      console.log("deleteData");
      setDataList((prevAllData) => {
        return prevAllData.filter((dataList) => {
          return dataList.uuid !== uuid;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchFtx = async () => {
  //   // symbol1?symbol2=${token1}/${token2}
  //   const res = await fetch(`/api/ftx?symbol1=${token1}&symbol2=${token2}`, {
  //     method: "GET",
  //     // params: { token1: form.token1.toUpperCase(), token2: form.token2.toUpperCase()},
  //     // params: { token1: "BTC", token2: "USDT"},
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => console.warn(error));
  //   setFtfData(res);
  //   console.log(res);
  // };
  // const fetchBinance = async () => {
  //   const res = await fetch(
  //     `/api/binance?symbol1=${tokenInput1}&symbol2=${tokenInput2}`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //     .then((response) => response.json())
  //     .catch((error) => console.warn(error));
  //   setBinanceData(res.data.price);
  //   console.log(binanceData);
  // };
  //  get ข้อมูล เพื่อเช็คคู่tokenซ้ำ(ไม่เขียนเพิ่ม)
  // submitแล้วข้อมูลเขียนบ้าง ไม่เขียนบ้าง
  async function handleSubmit() {
    try {
      const resFTX = await fetch(
        `/api/ftx?symbol1=${tokenInput1.toUpperCase()}&symbol2=${tokenInput2.toUpperCase()}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .catch((error) => console.warn(error));

      const resBINANCE = await fetch(
        `/api/binance?symbol1=${tokenInput1.toUpperCase()}&symbol2=${tokenInput2.toUpperCase()}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .catch((error) => console.warn(error));
      const percent =
        ((resBINANCE.data.price - resFTX.data.result.price) /
          resFTX.data.result.price) *
        100;

      const mappingData = {
        ...dataListObject,
        [`${tokenInput1.toUpperCase()}_${tokenInput2.toUpperCase()}`]: {
          uuid: uuid(),
          token1: tokenInput1.toUpperCase(),
          token2: tokenInput2.toUpperCase(),
          binace: resBINANCE.data.price,
          ftx: resFTX.data.result.price,
          diff: percent,
        },
      };
      setDataListObject(mappingData);
      window.localStorage.setItem("dataList", JSON.stringify(mappingData));
      // setDataList([
      //   ...dataList,
      //   {
      //     uuid: uuid(),
      //     token1: tokenInput1.toUpperCase(),
      //     token2: tokenInput2.toUpperCase(),
      //     binace: resBINANCE.data.price,
      //     ftx: resFTX.data.result.price,
      //     diff: percent,
      //   },
      // ]);

      // setData(res)
      await getData();
    } catch (error) {
      console.log("haven't found data token");
    }
  }

  return (
    <div>
      <div className="text-black font-bold text-3xl py-2 px-5 rounded">
        Market Diff
      </div>
      {/* <form
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
      > */}
      <div className="px-5">
        <a>Token 1</a>
      </div>
      {/* ???? size with input */}

      <div className="px-5">
        <input
          className="border-solid border-2 border-gray-400/100 px-10"
          type="string"
          // value={form.token1}
          onChange={(e) => setTokenInput1(e.target.value)}
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
          onChange={(x) => setTokenInput2(x.target.value)}
          // value={form.token2}
          // onChange={(e) => setForm({ ...form, token2: e.target.value })}
          required
        ></input>
      </div>
      <div className="px-5 py-3">
        <button
          onClick={(e) => handleSubmit()}
          className="border-solid border-2 border-gray-400/100 px-10"

          // type="submit"
          // value="update"
        >
          Fetch
        </button>
      </div>

      <div className="px-5 py-3">
        <a className="text-black font-bold text-2xl rounded">List</a>
      </div>
      {/* </form> */}

      {/* <div className="text-black font-bold text-3xl py-2 px-5 rounded">
        Market Diff
      </div>
      <div className="px-5">
        <a>Token 1</a>
      </div>
      {/* ???? size with input */}
      {/* <div className="px-5">
        <input
          className="border-solid border-2 border-gray-400/100 px-10"
          type="number"
        ></input>
      </div>
      <div className="px-5">
        <a>Token 2</a>
      </div>
      <div className="px-5">
        <input
          className="border-solid border-2 border-gray-400/100 px-10"
          type="number"
        ></input>
      </div>
      <div className="px-5 py-3">
        <button className="border-solid border-2 border-gray-400/100 px-10">
          Fetch
        </button>
      </div>

      <div className="px-5 py-3">
        <a className="text-black font-bold text-2xl rounded">List</a>
      </div> */}

      <div>
        <a className="px-8 py-3">Token1</a>
        <a className="px-8 py-3">Token2</a>
        <a className="px-8 py-3">Binace</a>
        <a className="px-8 py-3">FTX</a>
        <a className="px-12 py-3">Diff</a>
        <a className="px-12 py-3">Action</a>
        <button
          className="border-solid border-2 border-gray-400/100 px-9 py-3"
          onClick={() => getData()}
        >
          get
        </button>
        <br></br>
        {/* {dataList.length >= 1
          ? dataList.map((v) => {
              return (
                <div key={v.uuid}>
                  <a className="px-12 py-3">{v.token1}</a>
                  <a className="px-12 py-3">{v.token2}</a>
                  <a className="px-10 py-3">{Number(v.binace).toFixed(6)}</a>
                  <a className="px-9 py-3">{Number(v.ftx).toFixed(6)}</a>
                  <a className="px-9 py-3">{v.diff.toFixed(2)}</a>
                  <button
                    className="border-solid border-2 border-gray-400/100 px-9 py-3"
                    onClick={() => deleteData(v.uuid)}
                  >
                    map delete
                  </button>
                </div>
              );
            })
          : "no item"} */}
        {/* { Object.keys(dataListObject).length >= 1
          ? Object.keys(dataListObject).map(function(key, index) => {
              return (
                <div >
                  <a className="px-12 py-3">{dataListObject[key].token1}</a>
                  <a className="px-12 py-3">{v.token2}</a>
                  <a className="px-10 py-3">{Number(v.binace).toFixed(6)}</a>
                  <a className="px-9 py-3">{Number(v.ftx).toFixed(6)}</a>
                  <a className="px-9 py-3">{v.diff.toFixed(2)}</a>
                  <button
                    className="border-solid border-2 border-gray-400/100 px-9 py-3"
                    onClick={() => deleteData(v.uuid)}
                  >
                    map delete
                  </button>
                </div>
              );
            })
          : "no item"
        } */}
        {Object.keys(dataListObject).length >= 1
          ? Object.keys(dataListObject).map((key, index) => {
              return (
                <div key={key}>
                  <a className="px-12 py-3">{dataListObject[key].token1}</a>
                  <a className="px-12 py-3">{dataListObject[key].token2}</a>
                  <a className="px-10 py-3">{Number(dataListObject[key].binace).toFixed(6)}</a>
                  <a className="px-9 py-3">{Number(dataListObject[key].ftx).toFixed(6)}</a>
                  <a className="px-9 py-3">{dataListObject[key].diff}</a>
                  <button
                    className="border-solid border-2 border-gray-400/100 px-9 py-3"
                    onClick={() => deleteData(dataListObject[key].uuid)}
                  >
                    map delete
                  </button>
                </div>
              );
            })
          : "no items"}
      </div>
    </div>
  );
};
export default market_diff;
