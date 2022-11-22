function Contact({ channel }:any) {
  const { receiverName } = channel
  
  return (
    <li className="py-3 flex items-center justify-between">
      <span className="text-white">{receiverName}</span>
      <div className="bg-primary w-10 h-10 rounded-full"></div>
    </li>
  )
}
export default Contact