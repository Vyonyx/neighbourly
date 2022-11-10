/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next' // TS type for Next Pages
import Head from 'next/head' // NextJS Head component to set metadata and title
// import Image from 'next/image' // NextJS Image component for optimisations

import Nav from '../components/Nav'

const Home: NextPage = ({ users }: any) => {
  return (
    <div>
      <Head>
        <title>Neighbourly</title>
      </Head>
      
      <Nav />
      
      <div className="hero h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse px-10 lg:gap-20">
          <img 
            src="https://images.unsplash.com/photo-1513682121497-80211f36a7d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" 
            className="hidden lg:block max-w-sm max-h-96 rounded-lg shadow-2xl" 
            alt='hero' />
          <div className='flex flex-col align-center lg:align-start'>
            <h1 className="text-5xl font-bold self-center lg:self-start">Introducing Neighbourly!</h1>
            <p className="py-6 self-center max-w-lg lg:self-start">A decentralised marketplace to exchange goods with your neighbours through trade and generosity. Our mission is to facilitate neighbourly relationships and to provide an interface for reconnecting with others on a more human level.</p>
            <button className="btn text-neutral-d bg-primary border-0 self-center hover:bg-black hover:text-primary lg:self-start">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export default Home
