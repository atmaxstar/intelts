'use client'

import { useState } from 'react'
import Result from './Result'
import PartOneThree from './_questions/PartOneThree'
import PartTwo from './_questions/PartTwo'
import { usePartManager } from './usePartManager'

type Answer = {
  part1: { question: string; answer: string }[]
  part2: { subject: string; shouldSay: string[]; answer: string }
  part3: { question: string; answer: string }[]
}

interface Props {
  part1: string[]
  part2: {
    subject: string
    shouldSay: string[]
  }
  part3: string[]
}

const Exam = ({ part1, part2, part3 }: Props) => {
  const { part, gotoNextPart } = usePartManager()
  const [answer, setAnswer] = useState<Answer>({
    part1: [],
    part2: { subject: '', shouldSay: [], answer: '' },
    part3: [],
  })

  const appendPart1 = ({ ques, ans }: { ques: string; ans: string }) => {
    setAnswer((prev) => {
      return {
        ...prev,
        part1: [...prev.part1, { question: ques, answer: ans }],
      }
    })
  }

  const addPart2 = ({
    subject,
    shouldSay,
    answer,
  }: {
    subject: string
    shouldSay: string[]
    answer: string
  }) => {
    setAnswer((prev) => {
      return {
        ...prev,
        part2: { subject, shouldSay, answer },
      }
    })
  }

  const appendPart3 = ({ ques, ans }: { ques: string; ans: string }) => {
    setAnswer((prev) => {
      return {
        ...prev,
        part3: [...prev.part3, { question: ques, answer: ans }],
      }
    })
  }

  return (
    <>
      {part === 'part1' && (
        <PartOneThree
          questions={part1}
          part="part1"
          gotoNextPart={gotoNextPart}
          appendAnswer={appendPart1}
        />
      )}
      {part === 'part2' && (
        <PartTwo
          question={part2}
          handleNext={gotoNextPart}
          addAnswer={addPart2}
        />
      )}
      {part === 'part3' && (
        <PartOneThree
          questions={part3}
          part="part3"
          gotoNextPart={gotoNextPart}
          appendAnswer={appendPart3}
        />
      )}
      {part === 'end' && <Result answer={answer} />}
    </>
  )
}

export default Exam
