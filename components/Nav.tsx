/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react"

export default function Nav() {
  const { data: session } = useSession()
  return (
    <div className="navbar bg-slate-400 p-4 fixed top-0 left-0 z-10">
      <div className="flex-1">
        <a className="normal-case text-2xl hover:cursor-pointer hover:text-white">Neighbourly</a>
      </div>

      {session && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={session!.user!.image!} alt='profile photo' />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>
                  Profile
                </a>
              </li>
              <li onClick={() => signOut()}>
                <a>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!session && (
        <button className="btn" onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  )
}