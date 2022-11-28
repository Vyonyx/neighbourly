// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import AWS from 'aws-sdk'
import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid';

const ENDPOINT = 'https://syd1.digitaloceanspaces.com/'
const IMG_ENDPOINT = 'https://neighbourly-listings.syd1.digitaloceanspaces.com/'

const s3Client = new AWS.S3({
  endpoint: ENDPOINT,
  region: 'syd1',
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY_ID || 'assign an id',
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY || 'assign a secret'
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
)
{
  const form = formidable()

  form.parse(req, async (err, fields, files) => {
    if (!files) {
      res.status(400).send('No file uploaded')
      return
    }

    const file = files.file as formidable.File

    try {
      const uid = uuidv4()

      return s3Client.putObject({
        Bucket: 'neighbourly-listings',
        Key: `${uid}-${file.originalFilename}`,
        Body: fs.createReadStream(file.filepath),
        ACL: 'public-read',
      }, async () => {
        res.status(201).json({
          imgUrl: IMG_ENDPOINT + `${uid}-${file.originalFilename}`
        })
        return
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('File upload unsuccessful')
    }
  })

}
