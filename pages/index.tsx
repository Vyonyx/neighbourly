import type { NextPage } from 'next' // TS type for Next Pages
import Head from 'next/head' // NextJS Head component to set metadata and title
// import Image from 'next/image' // NextJS Image component for optimisations

const Home: NextPage = () => {
  const createUser = async () => {
    const randomNum = Math.floor(Math.random() * 1000)
    const res = await fetch('/api/db/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `User ${randomNum}`,
        email: `user${randomNum}@gmail.com`
      })
    })
  }

  return (
    <div>
      <Head>
        <title>Neighbourly</title>
      </Head>

      <h1>Hello World</h1>
      <button
        className='btn btn-primary'
        onClick={createUser}>
          Add User
      </button>
    </div>
  )
}

export default Home
