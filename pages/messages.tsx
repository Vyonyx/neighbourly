import Head from "next/head"
import Layout from "../components/layout/Layout"
import Nav from "../components/Nav"
import PantryList from "../components/PantryList"

function Messages() {
  return (
    <>
      <Head>
        <title>Neighbourly: Messages</title>
      </Head>

      <div className="flex flex-col lg:flex-row bg-neutral-l h-full">
        <PantryList />
      </div>
    </>
  )
}
export default Messages