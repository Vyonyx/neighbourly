/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import { listingData } from "../../lib/listingData"
import { RootState } from "../../store"

function Listing() {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query

  const listings = useSelector((state:RootState) => state.listings.items)
  
  if (!session) {
    return null
  }
  
  const listingInfo:any = listings.find(item => item._id === String(id))
  const { name, img, username, userID, description, isVegan, isGlutenFree } = listingInfo

  const handleContact = async () => {
    const channelUrl = `persist:${session!.user!.id}-${userID}`
    const data = await fetch('../api/db/addChannel', {
      method: 'POST',
      body: JSON.stringify({
        channel: channelUrl,
        senderName: session!.user!.name,
        senderID: session!.user!.id,
        receiverName: username,
        receiverID: userID,
      })
    })
    router.push('/messages')
  }
  
  return (
    <main className="h-full w-full p-10 pt-32 grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-10 lg:gap-16">
      <div className="lg:justify-self-end flex flex-col gap-6 items-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center">{name}</h1>
        {(isVegan || isGlutenFree) && (
        <div className="flex gap-2 justify-center">
          {isVegan && <span className="badge badge-outline text-green-600">Vegan</span>}
          {isGlutenFree && <span className="badge badge-outline text-violet-500">Gluten Free</span>}
        </div>
        )}
        <p>{description}</p>
        <button
          className="btn"
          onClick={handleContact}>
            Contact {username}
        </button>
      </div>
      <img
        src={img}
        alt="listing"
        className="max-w-sm lg:max-h-fit lg:justify-self-start rounded-lg" />
    </main>
  )
}
export default Listing