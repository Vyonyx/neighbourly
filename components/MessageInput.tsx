import React, { useState, useEffect, useRef } from "react"
import { useChannel } from "./AblyReactEffect";
import { useSession } from "next-auth/react";

function MessageInput() {
  let inputBox = useRef(null)
  let messageEnd = useRef(null)

  const { data: session } = useSession()

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<any[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel("persist:data", (message: any) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    await channel.history((err, resultPage) => {
      setMessages(resultPage.items.reverse())
    })
  }

  const sendChatMessage = (messageText: string) => {
    channel.publish({
      name: "user1-user2",
      data: {
        message: messageText,
        id: session!.user!.id
      }
    });
    setMessageText("");
    // const textBox = inputBox.current! as HTMLTextAreaElement
    // textBox.focus()
  }

  const handleTextChange = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLTextAreaElement
    setMessageText(target.value)
  }

  const handleSubmit = async (evt:React.FormEvent) => {
    evt.preventDefault()
    sendChatMessage(messageText);
  }

  
  return (
    <section className="flex flex-col gap-12 justify-end p-12 pt-12 h-screen lg:pt-32 bg-stone-200 flex-grow">
      <ul className="flex flex-col h-full gap-8 max-w-2xl flex-grow-1 mx-auto w-full overflow-y-scroll border-2 border-neutral p-6 scrollbar">
        {receivedMessages.map((item, index) => {
          const { message, id } = item.data
          if (id == session?.user!.id) {
            return (
              <li
                className="self-end text-right w-64 md:w-80 lg:w-96 h-fit bg-neutral rounded-lg py-3 px-6"
                key={index}>
                  {message}
              </li>
            )
          }
          return (
            <li
              className="w-64 md:w-80 lg:w-96 h-fit text-white bg-stone-500 rounded-lg py-3 px-6"
              key={index}>
                {message}
            </li>
          )
        })}
        <li ref={messageEnd}></li>
      </ul>
        
      <form
        className="flex items-center justify-center"
        onSubmit={handleSubmit}>
        <textarea
          className="textarea rounded-none rounded-l-lg resize-none w-full text-lg py-3 px-6 max-w-md"
          onChange={handleTextChange}
          value={messageText}
          name=""
          id=""
          rows={2}>
        </textarea>
        <button
          className="btn rounded-none rounded-r-lg text-neutral-d bg-primary border-0 w-fit h-full hover:bg-black hover:text-primary"
          type="submit">
            Send
        </button>
      </form>
    </section>
  )
}
export default MessageInput