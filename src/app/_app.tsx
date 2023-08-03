import type { AppProps } from 'next/app'
import './globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <Component {...pageProps} />{' '}
    </QueryClientProvider>
  )
}
