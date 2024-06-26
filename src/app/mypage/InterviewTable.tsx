'use client'

import { useEffect, useState } from "react";
import { fetchAnswers } from "./fetchAnswers"
import Link from "next/link";
import Tag from "./Tag";
import LoadingDialog from "@/Components/LoadingDialog";

const InterviewTable = () => {
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState<{ id: number; tag: string; }[]>([])

    const fetchAndStoreAnswer = async () => {
        await fetchAnswers('interview')
            .then(res => setAnswers(res));
    }
        
    useEffect(()=>{

        // 初期ローディングだけローディングダイアログを表示
        const initialLoad = async () => {
            setLoading(true);
            await fetchAndStoreAnswer();
            setLoading(false);
        }

        initialLoad();
    },[])
        
    return (
        <>
        {loading && <LoadingDialog/>}
        <div className="border w-full max-h-96 overflow-y-auto border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto">
            <table className="w-full text-sm leading-5">
                <thead>
                <tr>
                    <th className="sticky top-0 z-20 py-3 px-4 text-center font-medium text-gray-600 bg-gray-100">{"Tag (max: 25 char)"}</th>
                    <th className="sticky top-0 z-20 py-3 px-4 text-left font-medium text-gray-600 bg-gray-100"></th>
                </tr>
                </thead>
                <tbody>
                    {
                        answers.length !== 0 ?
                        answers.map(ans => 
                            <tr key={ans.id}>
                            <td><Tag test="interview" id={ans.id} tag={ans.tag} fetchAndStoreAnswers={fetchAndStoreAnswer}/></td>
                                <td className="py-3 px-4 text-right">
                                    <Link
                                        className="relative inline-flex items-center justify-center p-4 px-6 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-gray-500 rounded-full shadow-md group"
                                        href={`/mypage/interview/${ans.id}`}
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
        </>
    )
}

export default InterviewTable
