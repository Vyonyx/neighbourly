/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUserListingThunk, getUserListingsThunk } from "../slices/userListingsSlice"
import type { RootState, AppDispatch } from "../store"

import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { edit, reset } from "../slices/formSlice"
import { NextRouter, useRouter } from "next/router"

function PantryList() {
  const {data: session } = useSession()
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const listings = useSelector((state: RootState) => state.userListings.listings)

  useEffect(() => {
    dispatch(getUserListingsThunk(session?.user?.id || ''))
  }, [])

  const handleAdd = () => {
    checkRoute(router)
    dispatch(reset())
  }

  return (
    <div className="flex flex-col gap-6 bg-neutral-d pt-32 pb-12 px-12 lg:h-screen lg:w-96">
        <h1 className="text-5xl text-center text-primary border-b-2 pb-6 border-neutral-l">Pantry</h1>

        <ul className="bg-neutral-l h-full px-10 py-3 divide-y divide-solid divide-neutral flex flex-col shadow-lg lg:overflow-y-scroll scrollbar">
          {listings.map((listing) => (
            <PantryItem key={listing._id} listing={listing} />
          ))}
        </ul>

        <button
          onClick={handleAdd}
          className=" mt-6 btn text-neutral-d bg-primary border-0 self-center w-60 hover:bg-black hover:text-primary"
        >
          Add
        </button>
      </div>
  )
}

export default PantryList

function PantryItem({listing}:any) {
  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  const { _id, name } = listing
  
  const handleEdit = () => {
    checkRoute(router)
    dispatch(edit(listing))
  }
  
  const handleDelete = async () => {
    await dispatch(deleteUserListingThunk(_id))
  }
  
  return (
    <li className="flex items-center text-lg py-4">
      {name}
      <span className="ml-auto flex gap-2 items-center">
        <AiFillEdit
          onClick={handleEdit}
          size={20}
          className="text-black hover:text-secondary cursor-pointer"
        />
        <AiFillDelete
          onClick={handleDelete}
          size={20}
          className="text-black hover:text-secondary cursor-pointer"
        />
      </span>
    </li>
  )
}

const checkRoute = (router:NextRouter) => {
  const path = router.pathname
  if (path === '/messages') {
    router.push('/pantry')
  }
}