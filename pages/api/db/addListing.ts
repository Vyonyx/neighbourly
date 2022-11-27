import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const listing = JSON.parse(req.body)
  console.log(listing)
  
  const client = await clientPromise
  const db = client.db('neighbourly')

  try {
    const newListing = await db.collection('listings').insertOne(listing)
    res.status(201).json(newListing)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}