import { publicProcedure, router } from './trpc'

export const appRouter = router({
    callback: publicProcedure.query(() => {
        return { message: 'Hello World' }
    })
})

export type AppRouter = typeof appRouter