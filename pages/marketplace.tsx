/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getListings } from "../slices/listingsSlice"
import { AppDispatch, RootState } from "../store"

function Marketplace() {
const dispatch:AppDispatch = useDispatch()

  const listings = useSelector((state:RootState) => state.listings.items)

  useEffect(() => {
    dispatch(getListings())
  }, [])
  
  return (
    <main className="p-10 pt-32 bg-neutral-l h-full w-full">
      <section className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-content-center place-items-center mx-auto w-fit">
        {listings.map((listing) => (
        <Link href={`/listing/${listing._id}`} key={listing._id}>
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