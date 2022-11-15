import Head from "next/head"
import Layout from "../components/layout/Layout"
import Nav from "../components/Nav"

function Messages() {
  return (
    <div>
      <Head>
        <title>Neighbourly: Messages</title>
      </Head>

      <Layout>
        <h1>Your Messages</h1>
      </Layout>
    </div>
  )
}
export default Messages