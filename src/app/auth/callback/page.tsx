import { trpc } from '@/app/_trpc/client'

const Page = () => {
  const { data, isLoading } = trpc.callback.useQuery()

  return (
    <div>
      <h1>Auth Callback</h1>
    </div>
  )
}

export default Page
