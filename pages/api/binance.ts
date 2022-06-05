// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token1 = req.query.symbol1;
  const token2 = req.query.symbol2;


  const resBinance = await fetch(`https://api1.binance.com/api/v3/avgPrice?symbol=${token1}${token2}`)
  .then((response) => response.json())

  res.status(200).json({ data: resBinance });
}
