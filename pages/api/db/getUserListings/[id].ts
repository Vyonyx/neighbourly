import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  const client = await clientPromise
  const db = client.db('neighbourly')

  try {
    const userListings = await db
      .collection('listings')
      .find({ userID: id })
      .toArray()
    
    res.status(200).json(userListings)
    return
  } catch (error) {
    console.error(error)
    res.status(500)
    return
  }
}