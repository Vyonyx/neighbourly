/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Nav from "../components/Nav"

function Pantry() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    async function checkIfLoggedIn() {
      if (!session) {
        console.log('you shouldn\'t be here...')
        router.push('/')
      }
    }
    checkIfLoggedIn()
  }, [router, session])
  
  const [isEdit, setisEdit] = useState(false)
  const [isFree, setIsFree] = useState(false)
  const [uploadImageUrl, setUploadImageUrl] = useState('')

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
  }

  const handleFileUpload = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    const url = URL.createObjectURL(target.files![0])
    setUploadImageUrl(url)
  }

  const handleToggle = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    setIsFree(target.checked)
  }

  if(!session) {
    return <h1>Not Authorised</h1>
  }

  
  return (
    <div className="flex flex-col lg:flex-row bg-neutral-l h-full">
      <Nav />

      <div className="flex flex-col gap-6 bg-neutral-d pt-32 pb-12 px-12 lg:h-screen lg:w-96">
        <h1 className="text-5xl text-center text-primary border-b-2 pb-6 border-neutral-l">Pantry</h1>

        <ul className="bg-neutral-l h-full px-10 py-3 divide-y divide-solid divide-neutral flex flex-col shadow-lg lg:overflow-y-scroll">
          <li className="py-3">Item 1</li>
          <li className="py-3">Item 2</li>
          <li className="py-3">Item 3</li>
          <li className="py-3">Item 4</li>
          <li className="py-3">Item 5</li>
          <li className="py-3">Item 6</li>
          <li className="py-3">Item 7</li>
          <li className="py-3">Item 8</li>
          <li className="py-3">Item 9</li>
          <li className="py-3">Item 10</li>
          <li className="py-3">Item 11</li>
          <li className="py-3">Item 12</li>
          <li className="py-3">Item 13</li>
          <li className="py-3">Item 14</li>
          <li className="py-3">Item 15</li>
          <li className="py-3">Item 16</li>
          <li className="py-3">Item 17</li>
          <li className="py-3">Item 18</li>
          <li className="py-3">Item 19</li>
          <li className="py-3">Item 20</li>
        </ul>

        <button className=" mt-6 btn text-neutral-d bg-primary border-0 self-center w-60 hover:bg-black hover:text-primary">Add</button>
      </div>

      <div className="flex flex-col items-center bg-stone-100 h-full py-6 px-12 lg:flex-grow lg:pt-32 pb-16 lg:h-screen lg:max-h-screen lg:overflow-y-scroll">
        <h1
          className=
            "text-5xl text-neutral-d py-6 border-b-2 border-neutral-d w-full text-center lg:pt-0 lg:text-start">
          {isEdit ? 'Edit' : 'New'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-3 items-center justify-center mt-6 max-w-xl'>
          <div className="form-control w-full flex flex-col items-center">
            <label className="label self-start">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl" />
          </div>

          <div className="form-control w-full flex flex-col items-center">
            <label className="label self-start">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl" />
          </div>

          <div className="form-control my-3">
            <label className="label cursor-pointer flex gap-6">
              <span className="label-text text-secondary">
                {isFree ? 'For Free' : 'For Barter'}
              </span> 
              <input
                type="checkbox"
                className="toggle bg-secondary"
                onChange={handleToggle}
              />
            </label>
          </div>

          <input
            type="file"
            className="file-input w-full max-w-xl file-input-secondary"
            onChange={handleFileUpload}
          />
        </form>

        {uploadImageUrl && (
          <img
            src={uploadImageUrl}
            alt="item being uploaded"
            className="mt-12 rounded-lg max-w-sm lg:max-w-lg"
          />
        )}

        <button className="btn text-secondary bg-transparent border-2 border-secondary self-center w-60 mt-10 hover:bg-black hover:text-primary">Submit</button>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export default Pantry