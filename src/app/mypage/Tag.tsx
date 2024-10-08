import Image from 'next/image'
import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { updateTag } from './updateTag'

interface Props {
  test: 'ielts' | 'interview'
  id: number
  tag: string
  fetchAndStoreAnswers: () => void
}

const Tag = ({ test, id, tag, fetchAndStoreAnswers }: Props) => {
  const [editting, setEditting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState(tag)

  useEffect(() => {
    if (editting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editting])

  const finishEdit = async () => {
    setEditting(false)

    const idealAnswer = {
      test,
      id,
      tag: text,
    }

    await updateTag(idealAnswer)

    await fetchAndStoreAnswers()
  }

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    // 25文字まで受けつける
    if (e.target.value.length <= 25) {
      setText(e.target.value)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        {editting ? (
          <input
            id="tag"
            ref={inputRef}
            onChange={handleInputText}
            value={text}
            onBlur={finishEdit}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        ) : (
          <div className="w-10/12 px-4 py-3 text-center font-medium text-gray-600">
            {text}
          </div>
        )}
        <button onClick={() => setEditting(true)}>
          <Image width={20} height={20} src="/pencil.svg" alt="pencil" />
        </button>
      </div>
    </>
  )
}

export default Tag
