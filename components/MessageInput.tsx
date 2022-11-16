import { useState } from "react"

const messagesData = [
  {
    senderID: 1,
    receiverID: 2,
    subject: 'Hello'
  },
  {
    senderID: 2,
    receiverID: 1,
    subject: 'Hey, how\'s it going?'
  },
]

function MessageInput() {
  const myID = 1
  const [messages, setMessages] = useState(messagesData)
  
  return (
    <div className="p-6 pt-12 lg:pt-32 bg-stone-200 flex-grow">
      <ul className="flex flex-col gap-4 max-w-2xl mx-auto">
        {messages.map((item, index) => {
          if (item.senderID === myID) {
            return (
              <li
                className="self-end text-right w-72 h-fit bg-neutral rounded-lg py-3 px-6"
                key={index}>
                  {item.subject}
              </li>
            )
          }
          return (
            <li
              className="w-72 h-fit text-white bg-stone-500 rounded-lg py-3 px-6"
              key={index}>
                {item.subject}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default MessageInput