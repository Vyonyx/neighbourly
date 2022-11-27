import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Nav from "../Nav"

function Layout({ children } :any) {
  return (
    <div className="bg-neutral-l">
      <Nav />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export default Layout