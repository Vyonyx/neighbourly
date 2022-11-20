// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db('neighbourly')
  const { channel } = JSON.parse(req.body)

  const exists = await db.collection('messages')
    .find({channel: channel})
    .toArray()

  if (exists) {
    res.status(200)
  }

  const newMessage = await db.collection('messages').insertOne({channel: channel})
  res.json(newMessage)
}