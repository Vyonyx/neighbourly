import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function SignOut() {
  const {data: session, status} = useSession()
  const router = useRouter()
  
  if (status === 'loading') {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <h1 className="text-3xl">Sign Out of your account below:</h1>
      <button 
        className="btn primary-btn"
        onClick={() => signOut({
          callbackUrl: '/'
        })}
      >
        Sign Out
      </button>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}