/* eslint-disable @next/next/no-img-element */
import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react";

import { GiHamburgerMenu } from 'react-icons/gi'

export default function Nav() {
  const { data: session } = useSession()
  const navRef = useRef<HTMLElement>(null);
  const [prevYpos, setprevYpos] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      const currentYpos = window.scrollY;
      if (prevYpos < currentYpos) {
        navRef.current.style.top = `-${navRef.current.clientHeight}px`;
      } else {
        navRef.current.style.top = "0px";
      }
      setprevYpos(currentYpos);
    }

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [])


  return (
    <nav className="navbar bg-neutral py-2 px-10 fixed top-0 left-0 z-10 ease-linear duration-200" ref={navRef}>
      <div className="flex-1">
        <Link href='/' className="normal-case text-neutral-d text-4xl hover:cursor-pointer hover:text-primary">N</Link>
      </div>

      {session && (
        <>
          <nav className="mr-20 hidden md:inline-flex">
            <Link
              href='/marketplace'
              className="">
              <p
                className="btn btn-outline border-0 hover:bg-black hover:text-primary">
                Marketplace
              </p>
            </Link>

            <div className="divider md:divider-horizontal"></div>

            <Link
              href='/pantry'
              className="">
              <p className="btn btn-outline border-0 hover:bg-black hover:text-primary">
                Your Pantry
              </p>
            </Link>
          </nav>

          <Hamburger />
          <ProfileMenu session={session} />
        </>
      )}

      {!session && (
        <button className="btn bg-primary text-neutral-d border-0 hover:bg-black hover:text-primary" onClick={() => signIn()}>Sign In</button>
      )}
    </nav>
  )
}

function Hamburger() {
  return (
    <nav className="dropdown dropdown-end md:hidden mr-5">
      <label tabIndex={0} className='cursor-pointer'>
        <GiHamburgerMenu className="w-6 h-6 text-neutral-d" />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link
            href='/marketplace'>
            Marketplace
          </Link>
        </li>

        <li>
          <Link
            href='/pantry'>
            Your Pantry
          </Link>
        </li>
      </ul>
    </nav>
  )
}

type ProfileMenuProps = {
  session: Session;
}

function ProfileMenu({ session }: ProfileMenuProps) {
  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={session.user!.image!} alt='profile photo' />
          </div>
        </label>

        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li
            className="bg-primary hover:text-primary hover:bg-black">
            <Link href='/profile'>
              Profile
            </Link>
          </li>

          <li
            className="hover:text-primary hover:bg-black">
            <Link href='/messages'>
              Messages
            </Link>
          </li>

          <li
            className="hover:text-primary hover:bg-black"
            onClick={() => signOut()}>
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
