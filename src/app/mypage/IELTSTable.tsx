'use client'

import LoadingDialog from '@/Components/LoadingDialog'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Tag from './Tag'
import { fetchAnswers } from './fetchAnswers'

const IELTSTable = () => {
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState<{ id: number; tag: string }[]>([])

  const fetchAndStoreAnswer = async () => {
    await fetchAnswers('ielts').then((res) => setAnswers(res))
  }

  useEffect(() => {
    // 初期ローディングだけローディングダイアログを表示
    const initialLoad = async () => {
      setLoading(true)
      await fetchAndStoreAnswer()
      setLoading(false)
    }

    initialLoad()
  }, [])

  return (
    <>
      {loading && <LoadingDialog />}
      <div className="mx-auto max-h-96 w-full max-w-sm overflow-hidden overflow-y-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full text-sm leading-5">
          <thead>
            <tr>
              <th className="sticky top-0 z-20 bg-gray-100 px-4 py-3 text-center font-medium text-gray-600">
                Tag (max: 25 char)
              </th>
              <th className="sticky top-0 z-20 bg-gray-100 px-4 py-3 text-left font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {answers.length !== 0 ? (
              answers.map((ans) => (
                <tr key={ans.id}>
                  <td>
                    <Tag
                      test="ielts"
                      id={ans.id}
                      tag={ans.tag}
                      fetchAndStoreAnswers={fetchAndStoreAnswer}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-gray-500 p-4 px-6 py-1 font-medium text-indigo-600 shadow-md transition duration-300 ease-out"
                      href={`/mypage/ielts/${ans.id}`}
                    >
                      <span className="ease absolute inset-0 flex size-full -translate-x-full items-center justify-center bg-gray-500 text-white duration-300 group-hover:translate-x-0">
                        <svg
                          className="size-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                      <span className="ease absolute flex size-full items-center justify-center text-gray-500 transition-all duration-300 group-hover:translate-x-full">
                        detail
                      </span>
                      <span className="invisible relative">detail</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-left font-medium text-gray-600">
                  Nothing to show
                </td>
                <td className="px-4 py-3 text-left"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default IELTSTable
