import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="w-screen min-h-screen bg-slate-100 flex items-center justify-center">
      <SignUp />
    </div>
  )
}
