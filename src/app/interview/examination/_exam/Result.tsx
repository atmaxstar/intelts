import Accordion from '@/Components/Accordion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { postAnswer } from './postAnswer'

interface Props {
  answer: { question: string; answer: string }[]
}

const Result = ({ answer }: Props) => {
  const { data } = useSession()

  useEffect(() => {
    if (data?.user.id) {
      postAnswer({ part1: answer })
    }
  }, [data?.user.id])

  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: '',
      children: (
        <>
          {answer.map((op) => (
            <div key={op.question} className="my-6">
              <div className="mb-2 text-lg font-semibold text-gray-900">
                {op.question}
              </div>
              <span className="mb-2 text-base font-semibold text-gray-900">
                Your Answer
              </span>
              <div className="border-1 min-h-10 w-11/12 whitespace-pre-wrap break-words rounded-md border border-black p-2">
                {op.answer}
              </div>
            </div>
          ))}
        </>
      ),
      isOpen: true,
    },
  ])

  const toggleAccordion = (accordionkey: number) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen }
      } else {
        return { ...accord, isOpen: false }
      }
    })

    setAccordion(updatedAccordions)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="m-8 w-5/6 animate-fade-in-bottom p-2">
        <h2 className="mx-auto mb-2 text-2xl text-green-800">
          Questions and Answers
        </h2>
        {accordions.map((accordion) => (
          <Accordion
            key={accordion.key}
            title={accordion.title}
            isOpen={accordion.isOpen}
            toggleAccordion={() => toggleAccordion(accordion.key)}
          >
            {accordion.children}
          </Accordion>
        ))}
      </div>

      <Link
        className="m-10 animate-fade-in rounded border border-blue-500 px-10 py-1 font-semibold text-blue-500 hover:bg-blue-100"
        href="/"
      >
        Return To Home
      </Link>
    </div>
  )
}

export default Result
