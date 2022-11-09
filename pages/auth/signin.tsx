import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }: any) {
  return (
    <main className='bg-slate-700 p-6 h-screen w-screen flex flex-row items-center justify-center'>
      <div className='bg-slate-200 p-6 flex flex-col items-center justify-start gap-6 rounded-lg'>
        <h1 className='text-3xl w-max'>
          Sign In
        </h1>

        <div className="form-control w-full">
        <label className="input-group input-group-vertical">
          <span className='bg-slate-500 text-white'>Email</span>
          <input type="email" placeholder="info@site.com" className="input input-bordered focus:ring-offset-0" />
        </label>
      </div>
      
        <div className="form-control w-full">
        <label className="input-group input-group-vertical">
          <span className='bg-slate-500 text-white'>Password</span>
          <input type="password" className="input input-bordered" />
        </label>
      </div>

      <button className='btn w-full'>Log In</button>

      <div className="divider">OR</div>

      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button 
            onClick={() => signIn(provider.id, {
              callbackUrl: '/'
            })}
            className='btn w-96'
          >
            {provider.name}
          </button>
        </div>
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
