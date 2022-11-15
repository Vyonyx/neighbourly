/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import Nav from "../components/Nav"
import PantryList from "../components/PantryList"

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

  const fileInputRef = useRef(null)

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
  }

  const handleFileUpload = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    if(target.files![0]) {
      const url = URL.createObjectURL(target.files![0])
      setUploadImageUrl(url)
    }
  }

  const handleToggle = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    setIsFree(target.checked)
  }

  const handleDeleteImage = () => {
    setUploadImageUrl('')
    const fileInput = fileInputRef.current! as HTMLInputElement
    fileInput.value = ''
  }


  if(!session) {
    return <h1>Not Authorised</h1>
  }

  return (
    <div className="flex flex-col lg:flex-row bg-neutral-l h-full">
      <Nav />
      <PantryList />      

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
            ref={fileInputRef}
            type="file"
            className="file-input w-full max-w-xl file-input-secondary"
            onChange={handleFileUpload}
          />
        </form>

        {uploadImageUrl && (
          <div className="relative mt-12">
            <img
              src={uploadImageUrl}
              alt="item being uploaded"
              className="rounded-lg max-w-sm lg:max-w-lg"
            />
            <button
              onClick={handleDeleteImage}
              className="btn w-12 h-12 text-lg p-0 border-secondary absolute top-3 right-3 text-secondary rounded-full bg-transparent hover:text-white hover:bg-secondary hover:border-0">
                X
            </button>
          </div>
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