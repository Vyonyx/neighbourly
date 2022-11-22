// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db('neighbourly')

  if (req.method === 'GET') {
    try {
      const channels = await db.collection('channels').find({}).toArray()
      res.status(200).json(channels)
    } catch (error) {
      console.error(error)
    }
  }
}