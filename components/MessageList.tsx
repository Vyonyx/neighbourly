import Contact from "./Contact"

function MessageList() {
  return (
    <div className="flex flex-col gap-6 w-screen bg-neutral-d pt-32 pb-12 px-12 lg:h-screen lg:w-96">
        <h1 className="text-5xl text-center text-primary border-b-2 pb-6 border-neutral-l">Messages</h1>

        <ul className="h-full px-10 py-3 divide-y divide-solid divide-neutral flex flex-col">
          <Contact />
          <Contact />
          <Contact />
        </ul>
      </div>
  )
}
export default MessageList