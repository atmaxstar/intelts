import Accordion from '@/Components/Accordion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { postAnswer } from './postAnswer'

interface Props {
  answer: {
    part1: { question: string; answer: string }[]
    part2: { subject: string; shouldSay: string[]; answer: string }
    part3: { question: string; answer: string }[]
  }
}
const Result = ({ answer }: Props) => {
  const { data } = useSession()

  useEffect(() => {
    if (data?.user.id) {
      postAnswer(answer)
    }
  }, [data?.user.id])

  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: 'Part1',
      children: (
        <>
          {answer.part1.map((op) => (
            <div key={op.question} className="my-6 flex flex-col">
              <span className="mb-2 text-lg font-semibold text-gray-900">
                {op.question}
              </span>
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
      isOpen: false,
    },
    {
      key: 2,
      title: 'Part2',
      children: (
        <div className="flex flex-col">
          <div className="mb-2 text-lg font-semibold text-gray-900">
            {answer.part2.subject}
          </div>
          <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500">
            {answer.part2.shouldSay.map((op) => (
              <li key={op}>{op}</li>
            ))}
          </ul>
          <span className="mb-2 text-base font-semibold text-gray-900">
            Your Answer
          </span>
          <div className="border-1 min-h-10 w-11/12 whitespace-pre-wrap break-words rounded-md border border-black p-2">
            {answer.part2.answer}
          </div>
        </div>
      ),
      isOpen: false,
    },
    {
      key: 3,
      title: 'Part3',
      children: (
        <>
          {answer.part3.map((op) => (
            <div key={op.question} className="my-6 flex flex-col">
              <span className="mb-2 text-lg font-semibold text-gray-900">
                {op.question}
              </span>
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
      isOpen: false,
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
