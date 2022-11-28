import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise
  const db = client.db('neighbourly')
  
  const userID = JSON.parse(req.body)

  if (req.method === 'GET') {
    try {
      const userListings = await db
        .collection('listings')
        .find({ userID })
        .toArray()
      
      res.status(200).json(userListings)
      return
    } catch (error) {
      res.status(500)
      return
    }
  }
  res.status(500)
}