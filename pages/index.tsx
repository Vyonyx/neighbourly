import { link } from 'fs'
import type { NextPage } from 'next' // TS type for Next Pages
import Head from 'next/head' // NextJS Head component to set metadata and title
import User from '../models/userModel'
import connectDB from '../utils/connectDB'
import Image from 'next/image' // NextJS Image component for optimisations

interface User {
  _id: string;
  name: string;
  email: string;
}

const Home: NextPage = ({ users }: any) => {
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

      <ul className='flex gap-10'>
        {users.map((user: User) =>
          <li key={user._id} className="card w-96 bg-base-100 shadow-xl">
          <figure><Image width={500} height={500} src="https://images.unsplash.com/photo-1623261886693-779c444d3309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="person" /></figure>
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p>{user.email}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Say Hello</button>
            </div>
          </div>
        </li>
        )}
      </ul>
      
    </div>
  )
}

export async function getServerSideProps() {
  await connectDB()
  const users = await User.find()
  
  return {
    props: {
      users: JSON.parse(JSON.stringify(users))
    },
  }
}

export default Home
