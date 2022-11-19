import { useRouter } from "next/router"

function Listing() {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="h-full w-full p-10 pt-32">
      <h1>Listing ID: {id}</h1>
    </div>
  )
}
export default Listing