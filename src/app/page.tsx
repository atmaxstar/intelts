import Selection_IELTS from '@/Components/Selection_IELTS'
import Selection_Interview from '@/Components/Selection_Interview'
import Header from '@/Layout/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex h-5/6 flex-col items-center justify-center p-24">
        <div className="p-5 text-[min(5vw,25px)]">
          Select which you practice
        </div>
        <div className="mb-10 flex w-full flex-col gap-10 sm:flex-row">
          <Selection_IELTS />
          <Selection_Interview />
        </div>
      </main>
    </>
  )
}
