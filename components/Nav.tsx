/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Nav() {
  const { data: session } = useSession()

  return (
    <div className="navbar bg-neutral p-4 fixed top-0 left-0 z-10">
      <div className="flex-1">
        <Link href='/' className="normal-case text-neutral-d text-4xl hover:cursor-pointer hover:text-primary">N</Link>
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
              <li className="bg-primary hover:text-primary hover:bg-black">
                <a>
                  Profile
                </a>
              </li>
              <li
              className="hover:text-primary hover:bg-black"
              onClick={() => signOut()}>
                <a>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!session && (
        <button className="btn bg-primary text-neutral-d border-0 hover:bg-black hover:text-primary" onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  )
}