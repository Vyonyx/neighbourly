import Nav from "../Nav"

function Layout({ children } :any) {
  return (
    <div className="bg-neutral-l">
      <Nav />
      <main className="min-h-screen">
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