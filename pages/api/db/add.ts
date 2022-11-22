// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db('neighbourly')
  const { channel, senderID, receiverID } = JSON.parse(req.body)
  
  const exists = await db.collection('channels').findOne({channel: channel})

  if (exists) {
    res.status(200).json({exists: true})
    return
  }

  const newMessage = await db.collection('channels').insertOne({channel: channel})
  res.json(newMessage)
}