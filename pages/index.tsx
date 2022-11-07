import type { NextPage } from 'next' // TS type for Next Pages
import Head from 'next/head' // NextJS Head component to set metadata and title
import Image from 'next/image' // NextJS Image component for optimisations

const Home: NextPage = ({ users }: any) => {
  return (
    <div>
      <Head>
        <title>Neighbourly</title>
      </Head>
      
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export default Home
