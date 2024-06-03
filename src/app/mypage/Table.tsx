'use client'

import { useEffect, useState } from "react";
import { fetchAnswers } from "./fetchAnswers"
import Link from "next/link";

const Table = () => {
    const [answers, setAnswers] = useState<{ id: number; tag: string; }[]>([])

    useEffect(()=>{
        fetchAnswers()
            .then(res => setAnswers(res));
    },[])
        
    return (
        <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto mt-16">
            <table className="w-full text-sm leading-5">
                <thead className="bg-gray-100">
                <tr>
                    <th className="py-3 px-4 text-center font-medium text-gray-600">{"Tag"}</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600"></th>
                </tr>
                </thead>
                <tbody>
                    {
                        answers.length !== 0 ?
                        answers.map(ans => 
                            <tr key={ans.id}>
                                <td className="py-3 px-4 text-center font-medium text-gray-600">{ans.tag}</td>
                                <td className="py-3 px-4 text-right">
                                    <Link
                                        className="relative inline-flex items-center justify-center p-4 px-6 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-gray-500 rounded-full shadow-md group"
                                        href={`/mypage/ielts/${ans.id}`}
                                    >
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gray-500 group-hover:translate-x-0 ease">
                                            <svg
                                                className="w-6 h-6"
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
                                        <span className="absolute flex items-center justify-center w-full h-full text-gray-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                                            detail
                                        </span>
                                        <span className="relative invisible">
                                            detail
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        )
                        :
                        <tr>
                            <td className="py-3 px-4 text-left font-medium text-gray-600">Nothing to show</td>
                            <td className="py-3 px-4 text-left"></td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
