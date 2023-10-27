import { auth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Page = () => {
  const { userId } = auth()
  if (!userId) redirect('/auth/callback?origin=dashboard')

  return (
    <div>
      <h1>{userId}</h1>
    </div>
  )
}

export default Page
