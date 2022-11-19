/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useState } from "react"

const listingData = [
  {
    id: 1,
    name: 'Cake!',
    img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1010&q=80',
    username: 'John Smith',
    userID: 'abc123',
    description: 'some generic description about the listing'
  },
  {
    id: 2,
    name: 'Sourdough?',
    img: 'https://images.unsplash.com/photo-1563736113551-beda7ee0ebde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    username: 'Jane Doe',
    userID: 'abc456',
    description: 'some generic description about the listing'
  },
  {
    id: 3,
    name: 'Cake!',
    img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1010&q=80',
    username: 'John Smith',
    userID: 'abc123',
    description: 'some generic description about the listing'
  },
  {
    id: 4,
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
      <section className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-content-center place-items-center mx-auto w-fit">
        {listingData.map((listing, index) => (
        <Link href={`/listing/${listing.id}`} key={index}>
          <div className="card bg-white hover:text-slate-500 shadow-lg w-96 h-96">
            <figure className="relative">
              <img src={listing.img} alt="listing" />
              <h2 className="absolute bottom-0 right-0 py-2 px-3 rounded-tl-md text-white bg-slate-900">{listing.username}</h2>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{listing.name}</h2>
              <p>{listing.description}</p>
            </div>
          </div>
        </Link>
        ))}
      </section>
    </main>
  )
}
export default Marketplace