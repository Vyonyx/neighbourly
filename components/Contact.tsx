import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { updateChannel } from "../slices/channelSlice"

function Contact({ channel }:any) {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { receiverID, channel:selectedChannel } = channel

  const isReceiver = (receiverID == session!.user!.id)

  const handleClick = () => {
    dispatch(updateChannel(selectedChannel))
  }
  
  return ( 
    <li
      onClick={handleClick}
      className="py-3 flex items-center justify-between cursor-pointer text-white hover:text-primary"
    >
      <span>{isReceiver ? channel.senderName : session?.user!.name}</span>
      <div className="bg-primary w-10 h-10 rounded-full"></div>
    </li>
  )
}
export default Contact