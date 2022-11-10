import { getProviders, signIn } from 'next-auth/react'
import Link from 'next/link'

export default function SignIn({ providers }: any) {
  return (
    <main className='p-6 h-screen w-screen flex flex-col lg:flex-row lg:gap-20 lg:max-width-screen-lg items-center justify-center bg-stone-600'>
      <Link href='/'>
        <h1 className='fixed top-4 left-4 text-nYellow text-6xl'>N</h1>
      </Link>

      <div className='relative bg-stone-200 p-6 flex flex-col items-center justify-start gap-6 rounded-lg w-full lg:w-96 max-w-screen-sm'>
        <h1 className='text-3xl mb-4 text-stone-200 absolute bottom-full'>
          Sign In
        </h1>

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

      <div className='divider hidden lg:divider-horizontal lg:inline-flex'></div>

      <div className=' hidden lg:flex place-items-center place-content-center w-80 h-80 bg-nYellow rounded-full'>
        <h1 className='hidden lg:inline text-3xl text-stone-600'>Welcome Back</h1>
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
