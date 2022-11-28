// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import AWS from 'aws-sdk'
import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid';

const s3Client = new AWS.S3({
  endpoint: 'https://syd1.digitaloceanspaces.com',
  region: 'syd1',
  credentials: {
    accessKeyId: 'DO00DJLHJD2BYG7ADX7C',
    secretAccessKey: 'Zo0VQyXOE+MmlL/4mFK0OXskgAkYsgoLHzzpYwvyee4'
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
        ACL: 'public-read'
      }, async () => {
        const imgUrl = await s3Client
          .getSignedUrlPromise(
            'getObject', 
            {
              Key: `${uid}-${file.originalFilename}`,
              Bucket: 'neighbourly-listings'
            }
          )
          
        res.status(201).json({imgUrl: String(imgUrl)})
        return
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('File upload unsuccessful')
    }
  })

}
