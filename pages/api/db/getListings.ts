// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db('neighbourly')

  if (req.method === 'GET') {
    try {
      const listings = await db.collection('listings').find({}).toArray()
      res.status(200).json(listings)
    } catch (error) {
      console.error(error)
      res.json({error})
    }
  }
}