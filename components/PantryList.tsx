function PantryList() {
  return (
    <div className="flex flex-col gap-6 bg-neutral-d pt-32 pb-12 px-12 lg:h-screen lg:w-96">
        <h1 className="text-5xl text-center text-primary border-b-2 pb-6 border-neutral-l">Pantry</h1>

        <ul className="bg-neutral-l h-full px-10 py-3 divide-y divide-solid divide-neutral flex flex-col shadow-lg lg:overflow-y-scroll scrollbar">
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
  )
}
export default PantryList