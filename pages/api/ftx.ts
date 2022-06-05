// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token1 = req.query.symbol1;
  const token2 = req.query.symbol2;
  // console.log(req.query)
  // console.log("req token: ", token1, token2);
  // console.log(`https://ftx.com/api/markets/${token1}/${token2}`);

  const resFtx = await fetch(`https://ftx.com/api/markets/${token1}/${token2}`)
  .then((response) => response.json())
  // const resFtx = await axios.get(
  // `https://ftx.com/api/markets/symbol1?symbol2=${token1}/${token2}`
  // );
  console.log(resFtx.result.price)
  res.status(200).json({ data: resFtx });
}
