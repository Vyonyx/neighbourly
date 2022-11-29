import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string

  const client = await clientPromise
  const db = client.db('neighbourly')

  if (req.method === 'GET') {
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

  if (req.method === 'DELETE') {
    try {
      const deleteData = await db
        .collection('listings')
        .deleteOne({ _id: new ObjectId(id) })
      
      res.status(202).json(id)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  if (req.method === 'PATCH') {
    try {
      const update = req.body
      const patchData = await db
        .collection('listings')
        .updateOne({ _id: new ObjectId(id) }, { $set: update })

        res.status(200).json(patchData)
      } catch (error) {
      res.status(500).json(error)
    }
  }

  res.status(200).send('Did not recognise request')
}