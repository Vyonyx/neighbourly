import type { NextPage } from 'next' // TS type for Next Pages
import Head from 'next/head' // NextJS Head component to set metadata and title
// import Image from 'next/image' // NextJS Image component for optimisations

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Neighbourly</title>
      </Head>

      <h1>Hello World</h1>
    </div>
  )
}

export default Home
