/* eslint-disable @next/next/no-img-element */
import { useState } from "react"

const listingData = [
  {
    name: 'Cake!',
    img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1010&q=80',
    username: 'John Smith',
    userID: 'abc123',
    description: 'some generic description about the listing'
  },
  {
    name: 'Sourdough?',
    img: 'https://images.unsplash.com/photo-1563736113551-beda7ee0ebde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    username: 'Jane Doe',
    userID: 'abc456',
    description: 'some generic description about the listing'
  },
  {
    name: 'Cake!',
    img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1010&q=80',
    username: 'John Smith',
    userID: 'abc123',
    description: 'some generic description about the listing'
  },
  {
    name: 'Sourdough?',
    img: 'https://images.unsplash.com/photo-1563736113551-beda7ee0ebde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    username: 'Jane Doe',
    userID: 'abc456',
    description: 'some generic description about the listing'
  },
]

function Marketplace() {
  const [listings, setListings] = useState<any[]>(listingData)
  
  return (
    <main className="p-10 pt-32 bg-neutral-l h-full w-full">
      {/* <h1 className="text-6xl text-center">Marketplace</h1> */}
      <section className="grid">
        {listingData.map((listing, index) => (
        <div key={index} className="card bg-white shadow-lg w-96 h-96">
          <figure><img src={listing.img} alt="listing" /></figure>
          <div className="card-body">
            <h2 className="card-title">{listing.name}</h2>
            <p>{listing.description}</p>
          </div>
        </div>
        ))}
      </section>
    </main>
  )
}
export default Marketplace