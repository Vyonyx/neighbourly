// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import User from '../../../models/userModel'

import clientPromise from '../../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { name, email } = req.body
  // await connectDB()
  const client = await clientPromise
  const db = client.db('neighbourly')

  const newUser = await db.collection('users').insertOne(req.body)
  res.json({ newUser })
}