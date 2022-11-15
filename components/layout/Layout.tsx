import Nav from "../Nav"

function Layout({ children } :any) {
  return (
    <div className="bg-neutral-l h-full">
      <Nav />
      <main className="pt-32 h-screen">
        {children}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}

export default Layout