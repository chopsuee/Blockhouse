'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PriceTracker from "./tracker/page";

const queryClient = new QueryClient()

export default function Home() {
return(
  <main className="w-full">
    <QueryClientProvider client={queryClient}>
      <PriceTracker />
    </QueryClientProvider>
  </main>
);
}
