/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react"
import Link from "next/link"
import Nav from "../components/Nav"

function Profile() {
  const { data: session } = useSession()

  if (!session) {
    return <div>No Entry</div>
  }

  const { name, image } = session.user!
  
  return (
    <div className="flex flex-col items-center pt-36 p-14 gap-10 bg-neutral-l h-screen md:px-40 lg:flex-row lg:gap-20">
      <div className="flex flex-col gap-10 items-center">
        <div className="avatar">
          <div className="rounded-full w-60 lg:w-80">
            <img src={image!} alt="" />
          </div>
        </div>
        <h1 className="text-3xl">{name}</h1>
      </div>

      <div className="flex flex-col gap-10 items-center">
        <p className="text-justify max-w-sm md:max-w-md lg:max-w-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum placeat consequuntur laudantium fuga ducimus neque ipsam, voluptatum autem? Aperiam tempore exercitationem ipsum, reiciendis beatae consequuntur facilis minima itaque a doloremque illum eveniet facere ab quam nemo magnam aliquid laborum vero.
        </p>
        <Link
          href='/pantry'
          className="btn text-neutral-d bg-primary border-0 self-center w-60 hover:bg-black hover:text-primary lg:self-start lg:mt-6">
          Your Pantry
        </Link>
      </div>
    </div>
  )
}
export default Profile