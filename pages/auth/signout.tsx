import { NextPage } from "next"
import { signOut } from "next-auth/react"

const SignOut: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Sign Out of your account below:</h1>
      <button 
        className="btn primary-btn"
        onClick={() => {signOut()}}
      >
        Sign Out
      </button>
    </div>
  )
}
export default SignOut