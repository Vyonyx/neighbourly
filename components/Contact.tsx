import { useSession } from "next-auth/react"

function Contact({ channel }:any) {
  const { data: session } = useSession()
  const { receiverID } = channel

  const isReceiver = (receiverID == session!.user!.id)
  
  return ( 
    <li className="py-3 flex items-center justify-between">
      <span className="text-white">{isReceiver ? channel.senderName : session?.user!.name}</span>
      <div className="bg-primary w-10 h-10 rounded-full"></div>
    </li>
  )
}
export default Contact