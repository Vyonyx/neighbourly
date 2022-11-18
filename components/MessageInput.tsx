import React, { useState, useEffect, useRef } from "react"
import { useChannel } from "./AblyReactEffect";
import { useSession } from "next-auth/react";

function MessageInput() {
  let inputBox = useRef(null)
  let messageEnd = useRef(null)
  const myID = 1

  const { data: session } = useSession()

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<any[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel("persist:data", (message: any) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  useEffect(() => {
    channel.history((err, resultPage) => {
      setMessages(resultPage.items.reverse())
    })
  }, [])


  /*
  useEffect(() => {
    // messageEnd.current!.scrollIntoView({ behaviour: "smooth" });
    const getHistory = async () => {
      // const history = await channel.history()
      // setMessages([...history.items])
      const history = await channel.history((err, resultPage) => {
        // setMessages(resultPage.items.reverse())
        return console.table(resultPage.items)
      })
    }
    getHistory()
  }), [];
  */

  const sendChatMessage = (messageText: string) => {
    channel.publish({
      name: "persist:data",
      data: messageText,
      id: session!.user!.id
    });
    setMessageText("");
    const textBox = inputBox.current! as HTMLTextAreaElement
    // textBox.focus()
  }

  const handleTextChange = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLTextAreaElement
    setMessageText(target.value)
  }

  const handleSubmit = (evt:React.FormEvent) => {
    evt.preventDefault()
    sendChatMessage(messageText);
  }

  
  return (
    <section className="flex flex-col gap-12 justify-end p-12 pt-12 h-screen lg:pt-32 bg-stone-200 flex-grow">
      <ul className="flex flex-col gap-8 max-w-2xl flex-grow-1 mx-auto w-full overflow-y-scroll border-2 border-neutral p-6 scrollbar">
        {receivedMessages.map((item, index) => {
          if (item.id == session?.user!.id) {
            return (
              <li
                className="self-end text-right w-64 md:w-80 lg:w-96 h-fit bg-neutral rounded-lg py-3 px-6"
                key={index}>
                  {item.data}
              </li>
            )
          }
          return (
            <li
              className="w-64 md:w-80 lg:w-96 h-fit text-white bg-stone-500 rounded-lg py-3 px-6"
              key={index}>
                {item.data}
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