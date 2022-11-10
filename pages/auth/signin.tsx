import { getProviders, signIn } from 'next-auth/react'
import Link from 'next/link'

export default function SignIn({ providers }: any) {
  return (
    <main className='p-6 h-screen w-screen flex flex-col lg:flex-row lg:max-width-screen-lg items-center justify-center bg-stone-600'>
      <Link href='/'>
        <h1 className='fixed top-4 left-4 text-nYellow text-6xl'>N</h1>
      </Link>
      <h1 className='text-3xl mb-6 text-stone-200'>
        Sign In
      </h1>
      <div className='bg-stone-200 p-6 flex flex-col items-center justify-start gap-6 rounded-lg w-full'>

        <div className="form-control w-full">
        <label className="input-group input-group-vertical">
          <span className='bg-nYellow text-stone-600'>Email</span>
          <input type="email" placeholder="info@gmail.com" className="input" />
        </label>
      </div>
      
        <div className="form-control w-full">
        <label className="input-group input-group-vertical">
          <span className='bg-nYellow text-stone-600'>Password</span>
          <input type="password" className="input" />
        </label>
      </div>

      <button className='btn w-full bg-nYellow text-stone-600 border-0 '>LOGIN</button>

      <div className="divider">OR</div>

      {Object.values(providers).map((provider: any) => (
        <button
        key={provider.name}
          onClick={() => signIn(provider.id, {
            callbackUrl: '/'
          })}
          className='btn w-full bg-nYellow text-stone-600 border-0'
        >
          {provider.name}
        </button>
      ))}
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
