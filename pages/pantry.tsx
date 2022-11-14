import React, { useState } from "react"
import Nav from "../components/Nav"

function Pantry() {
  const [isEdit, setisEdit] = useState(false)

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
  }
  
  return (
    <div className="bg-neutral-l h-full">
      <Nav />

      <div className="flex flex-col gap-6 bg-neutral-d pt-32 pb-12 px-12">
        <h1 className="text-5xl text-center text-primary border-b-2 pb-6 border-neutral-l">Pantry</h1>

        <ul className="bg-neutral-l h-full px-10 py-3 divide-y divide-solid divide-neutral flex flex-col shadow-lg">
          <li className="py-3">Item 1</li>
          <li className="py-3">Item 2</li>
          <li className="py-3">Item 3</li>
          <li className="py-3">Item 4</li>
          <li className="py-3">Item 5</li>
        </ul>

        <button className=" mt-6 btn text-neutral-d bg-primary border-0 self-center w-60 hover:bg-black hover:text-primary lg:self-start">Add</button>
      </div>

      <div className="flex flex-col items-center bg-stone-100 h-full py-6 px-12">
        <h1 className="text-5xl text-neutral-d">
          {isEdit ? 'Edit' : 'New'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-3 items-center justify-center mt-6 max-w-xl'>
          <div className="form-control w-full flex flex-col items-center">
            <label className="label self-start">
              <span className="label-text">Item Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Pantry