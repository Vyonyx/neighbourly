/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUserListingThunk, getUserListingsThunk } from "../slices/userListingsSlice"
import type { RootState, AppDispatch } from "../store"

import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

function PantryList() {
  const {data: session } = useSession()
  const dispatch:AppDispatch = useDispatch()
  const listings = useSelector((state: RootState) => state.userListings.listings)

  useEffect(() => {
    dispatch(getUserListingsThunk(session?.user?.id || ''))
  }, [])

  return (
    <div className="flex flex-col gap-6 bg-neutral-d pt-32 pb-12 px-12 lg:h-screen lg:w-96">
        <h1 className="text-5xl text-center text-primary border-b-2 pb-6 border-neutral-l">Pantry</h1>

        <ul className="bg-neutral-l h-full px-10 py-3 divide-y divide-solid divide-neutral flex flex-col shadow-lg lg:overflow-y-scroll scrollbar">
          {listings.map(({ _id, name }) => (
            <PantryItem key={_id} name={name} id={_id} />
          ))}
        </ul>

        <button className=" mt-6 btn text-neutral-d bg-primary border-0 self-center w-60 hover:bg-black hover:text-primary">Add</button>
      </div>
  )
}

export default PantryList


type PantryItemType = {
  id: string;
  name: string;
}
function PantryItem({ id, name }: PantryItemType) {
  const dispatch:AppDispatch = useDispatch()
  
  const handleDelete = async () => {
    await dispatch(deleteUserListingThunk(id))
  }
  
  return (
    <li className="flex items-center text-lg py-4">
      {name}
      <span className="ml-auto flex gap-2 items-center">
        <AiFillEdit size={20} className="text-black hover:text-secondary cursor-pointer" />
        <AiFillDelete
          onClick={handleDelete}
          size={20}
          className="text-black hover:text-secondary cursor-pointer"
        />
      </span>
    </li>
  )
}