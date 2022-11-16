import Head from "next/head"
import Layout from "../components/layout/Layout"
import MessageInput from "../components/MessageInput"
import MessageList from "../components/MessageList"
import Nav from "../components/Nav"
import PantryList from "../components/PantryList"

function Messages() {
  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>

      <div className="flex flex-col-reverse lg:flex-row bg-neutral-l h-full">
        <aside className="hidden lg:block">
          <PantryList />
        </aside>
        <MessageInput />
        <MessageList />
      </div>
    </>
  )
}
export default Messages