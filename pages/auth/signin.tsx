import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }: any) {
  return (
    <>
      <h1 className='text-3xl'>
        Sign in with:
      </h1>

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
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
