import Head from "next/head"
import Layout from "../components/layout/Layout"
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
        <div className="pt-32 bg-stone-200 flex-grow">
          <h1>Messages will go here</h1>
        </div>
        <MessageList />
      </div>
    </>
  )
}
export default Messages