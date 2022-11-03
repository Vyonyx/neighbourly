// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { name, email } = req.body
  const db = await connectDB()
  const user = await User.create(req.body)
  res.json({ user })
}