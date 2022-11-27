// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db('neighbourly')
  const body = JSON.parse(req.body)

  const re1 = new RegExp(`${body.senderID}`)
  const re2 = new RegExp(`${body.receiverID}`)

  const exists = await db
    .collection('channels')
    .findOne({ $and: [
      { channel: { $regex: re1 } },
      { channel: { $regex: re2 } }
    ]})

  if (exists) {
    res.status(200).send(false)
    return
  }

  const newMessage = await db
    .collection('channels')
    .insertOne(body)
  res.json(newMessage)
}