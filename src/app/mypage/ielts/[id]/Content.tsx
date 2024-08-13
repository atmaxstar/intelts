import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { updateIdealAnswer } from './updateIdealAnswer'

interface Props {
  part: 'one' | 'two' | 'three'
  id: number
  ielts_answer_id: number
  question: string
  shouldSay?: string[]
  answer: string
  ideal_answer: string
  fetchAndStoreAnswer: () => void
}

const Content = ({
  part,
  id,
  ielts_answer_id,
  question,
  shouldSay,
  answer,
  ideal_answer,
  fetchAndStoreAnswer,
}: Props) => {
  const [editting, setEditting] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState(ideal_answer)

  // 編集が始まったらテキストボックスにフォーカス
  useEffect(() => {
    if (editting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editting])

  const finishEdit = async () => {
    setEditting(false)

    const idealAnswer = {
      id,
      ielts_answer_id,
      ideal_answer: text,
    }

    await updateIdealAnswer({ part, ...idealAnswer })

    await fetchAndStoreAnswer()
  }

  return (
    <div className="my-6 flex flex-col">
      <span className="mb-2 text-lg font-semibold text-gray-900">
        {question}
      </span>
      {shouldSay && (
        <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500">
          {shouldSay.map((op) => (
            <li key={op}>{op}</li>
          ))}
        </ul>
      )}
      <span className="mb-2 text-base font-semibold text-gray-900">
        Your Answer
      </span>
      <div className="border-1 min-h-10 w-11/12 whitespace-pre-wrap break-words rounded-md border border-black p-2">
        {answer}
      </div>
      <span className="mb-2 text-base font-semibold text-gray-900">
        Ideal Answer
      </span>
      <div className="flex items-center justify-between gap-3">
        {editting ? (
          <textarea
            id="ideal-answer"
            ref={inputRef}
            onChange={(e) => setText(e.target.value)}
            value={text}
            onBlur={finishEdit}
            rows={4}
            className="block w-11/12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        ) : (
          <div className="border-1 min-h-10 w-11/12 whitespace-pre-wrap break-words rounded-md border border-black p-2">
            {text}
          </div>
        )}
        <button onClick={() => setEditting(true)}>
          <Image width={20} height={20} src="/pencil.svg" alt="pencil" />
        </button>
      </div>
    </div>
  )
}

export default Content
