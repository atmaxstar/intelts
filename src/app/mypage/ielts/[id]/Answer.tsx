'use client'
import Accordion from '@/Components/Accordion'
import LoadingDialog from '@/Components/LoadingDialog'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Content from './Content'
import { fetchAnswer } from './fetchAnswer'

interface Props {
  id: number
}

const Answer = ({ id }: Props) => {
  const [loading, setLoading] = useState(false)

  const [partOne, setPartOne] = useState<
    {
      id: number
      ielts_answer_id: number
      question: string
      answer: string
      ideal_answer: string
    }[]
  >([])

  const [partTwo, setPartTwo] = useState<{
    id: number
    ielts_answer_id: number
    question: string
    shouldSay: string[]
    answer: string
    ideal_answer: string
  }>()

  const [partThree, setPartThree] = useState<
    {
      id: number
      ielts_answer_id: number
      question: string
      answer: string
      ideal_answer: string
    }[]
  >([])

  const fetchAndStoreAnswer = async () => {
    await fetchAnswer(id).then((res) => {
      setPartOne(res.partOne)
      setPartTwo(res.partTwo)
      setPartThree(res.partThree)
    })
  }

  useEffect(() => {
    // 初期ローディングだけローディングダイアログを表示
    const initialLoad = async () => {
      setLoading(true)
      await fetchAndStoreAnswer()
      // ロード終了時にアコーディオンを開く
      toggleAccordion(1)
      setLoading(false)
    }

    initialLoad()
  }, [])

  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: 'Part1',
      children: <></>,
      isOpen: false,
    },
    {
      key: 2,
      title: 'Part2',
      children: <></>,
      isOpen: false,
    },
    {
      key: 3,
      title: 'Part3',
      children: <></>,
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

  useEffect(() => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === 1) {
        return {
          ...accord,
          children: (
            <>
              {partOne.map((op) => (
                <Content
                  key={`one-${op.id}`}
                  part="one"
                  id={op.id}
                  ielts_answer_id={op.ielts_answer_id}
                  question={op.question}
                  answer={op.answer}
                  ideal_answer={op.ideal_answer}
                  fetchAndStoreAnswer={fetchAndStoreAnswer}
                />
              ))}
            </>
          ),
        }
      } else if (accord.key === 2) {
        return {
          ...accord,
          children: (
            <>
              {partTwo && (
                <Content
                  key={`one-${partTwo.id}`}
                  part="one"
                  id={partTwo.id}
                  ielts_answer_id={partTwo.ielts_answer_id}
                  question={partTwo.question}
                  shouldSay={partTwo.shouldSay}
                  answer={partTwo.answer}
                  ideal_answer={partTwo.ideal_answer}
                  fetchAndStoreAnswer={fetchAndStoreAnswer}
                />
              )}
            </>
          ),
        }
      } else if (accord.key === 3) {
        return {
          ...accord,
          children: (
            <>
              {partThree.map((op) => (
                <Content
                  key={`three-${op.id}`}
                  part="three"
                  id={op.id}
                  ielts_answer_id={op.ielts_answer_id}
                  question={op.question}
                  answer={op.answer}
                  ideal_answer={op.ideal_answer}
                  fetchAndStoreAnswer={fetchAndStoreAnswer}
                />
              ))}
            </>
          ),
        }
      } else {
        return accord
      }
    })

    setAccordion(updatedAccordions)
  }, [partOne, partTwo, partThree])

  return (
    <>
      {loading && <LoadingDialog />}
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
          href="/mypage"
        >
          Return To Mypage
        </Link>
      </div>
    </>
  )
}

export default Answer
