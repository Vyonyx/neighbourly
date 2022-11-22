/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Contact from "./Contact"
import { useSession } from "next-auth/react"


function MessageList() {
  const { data:session } = useSession()
  const [channels, setChannels] = useState([])
  
  useEffect(() => {
    const getChannels = async () => {
      const res = await fetch('../api/db/getChannels', {
        method: 'GET'
      })
      const channelsData = await res.json()
      const relevantChannels = channelsData.filter((item:any) => item.channel.includes(session?.user!.id))
      setChannels(relevantChannels)
    }
    getChannels()
  }, [])
  
  return (
    <div className="flex flex-col gap-6 w-screen bg-neutral-d pt-32 pb-12 px-12 lg:h-screen lg:w-96">
        <h1 className="text-5xl text-center text-primary border-b-2 pb-6 border-neutral-l">Messages</h1>
        
        {(channels.length === 0) && <h1 className="text-md text-white text-center">Contact someone via marketplace</h1>}
        {(channels.length > 0) && (
          <ul className="max-w-lg w-full self-center h-full px-10 py-3 divide-y divide-solid divide-neutral flex flex-col">
            {channels.map((item:any) => <Contact key={item._id} channel={item} />)}
          </ul>
        )}
      </div>
  )
}
export default MessageList