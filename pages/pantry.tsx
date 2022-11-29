/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import PantryList from "../components/PantryList"
import Head from "next/head"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"

import { addUserDetails, reset, update } from '../slices/formSlice'

function Pantry() {
  const router = useRouter()
  const dispatch:AppDispatch = useDispatch()
  const { data: session } = useSession()

  const fileInputRef = useRef(null)

  useEffect(() => {
    async function checkIfLoggedIn() {
      if (!session) {
        router.push('/')
      }
    }
    checkIfLoggedIn()
  }, [router, session])
  
  const isEdit = useSelector((state:RootState) => state.form.isEdit)
  const [uploadImageUrl, setUploadImageUrl] = useState('')
  const formData = useSelector((state:RootState) => state.form.fields)

  useEffect(() => {
    dispatch(addUserDetails({
      username: session?.user?.name!,
      userID: session?.user?.id!
    }))
  }, [])

  const { name, description, isVegan, isGlutenFree, isFree } = formData

  const handleChange = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    const {id, value} = target
    dispatch(update({id, value}))
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()

    if (name === '') {
      toast.warn('Please fill in the name of your listing')
      return
    } else if (description === '') {
      toast.warn('Please add a description of your listing')
      return
    } else if (uploadImageUrl === '') {
      toast.warn('Please add a photo of your listing')
      return
    } 
    
    const target = evt.target as HTMLFormElement
    const fileInput = target.querySelector('#demo') as HTMLInputElement

    const data = new FormData()
      data.append('file', fileInput.files![0])

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: data
    })

    const { imgUrl } = await res.json()
    await fetch('/api/db/addListing', {
      method: 'POST',
      body: JSON.stringify({...formData, img: imgUrl})
    })
    
    dispatch(reset())

    router.push('/marketplace')
  }

  const handleFileUpload = async (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    if(target.files![0]) {
      const url = URL.createObjectURL(target.files![0])
      setUploadImageUrl(url)
    }
  }

  const handleToggle = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    const { id } = target
    const isChecked = target.checked

    dispatch(update({id, value: isChecked}))
  }

  const handleDeleteImage = () => {
    setUploadImageUrl('')
    const fileInput = fileInputRef.current! as HTMLInputElement
    fileInput.value = ''
  }

  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = evt.target
    const isChecked = evt.target.checked
    
    dispatch(update({id, value: isChecked}))
  }


  if(!session) {
    return <h1>Not Authorised</h1>
  }

  return (
    <div className="flex flex-col lg:flex-row bg-neutral-l h-full">
      <Head>
        <title>Pantry</title>
      </Head>
      
      <PantryList />

      <div className="flex flex-col items-center bg-white h-full py-10 px-12 lg:pt-32 lg:flex-grow pb-16 lg:h-screen lg:max-h-screen lg:overflow-y-scroll scrollbar">
        <h1
          className=
            "text-5xl text-neutral-d py-6 border-neutral-d w-full text-center lg:pt-0">
          {isEdit ? 'Edit' : 'New'}
        </h1>

        <form
          id="listing-form"
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-3 items-center justify-center mt-6 max-w-xl'>
          <div className="form-control w-full flex flex-col items-center">
            <label className="label self-start">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              onChange={handleChange}
              value={name}
              id='name'
              className="input input-bordered border-secondary w-full max-w-xl" />
          </div>

          <div className="form-control w-full flex flex-col items-center">
            <label className="label self-start">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              onChange={handleChange}
              value={description}
              id='description'
              className="input input-bordered border-secondary w-full max-w-xl" />
          </div>

          <section className="w-full flex items-center justify-start gap-5 my-6 px-10">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Vegan</span>
                <input
                  type="checkbox"
                  id="isVegan"
                  checked={isVegan}
                  onChange={handleCheckboxChange}
                  className="checkbox checkbox-secondary ml-2" />
              </label>
            </div>
            <div className="form-control mr-auto">
              <label className="label cursor-pointer">
                <span className="label-text">Gluten Free</span>
                <input
                  type="checkbox"
                  id="isGlutenFree"
                  checked={isGlutenFree}
                  onChange={handleCheckboxChange}
                  className="checkbox checkbox-secondary ml-2" />
              </label>
            </div>

          <div className="form-control">
            <label className="label cursor-pointer flex gap-6 relative">
              <span className="label-text text-secondary absolute w-max left-[-180%]">
                {isFree ? 'For Free' : 'For Barter'}
              </span> 
              <input
                type="checkbox"
                id="isFree"
                checked={isFree}
                className="toggle bg-secondary"
                onChange={handleToggle}
              />
            </label>
          </div>
          </section>


          <input
            ref={fileInputRef}
            type="file"
            id="demo"
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

        <button type="submit" form="listing-form" className="btn text-secondary bg-transparent border-2 border-secondary self-center w-60 mt-10 hover:bg-black hover:text-primary">Submit</button>
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