'use client'
import React, { useEffect, useState } from 'react'
import { fetchAnswer } from './fetchAnswer';
import Link from 'next/link';
import Accordion from "@/Components/Accordion";

interface Props {
    id: number;
}

const Answer = ({id}: Props) => {

    const [partOne, setPartOne] = useState<
    {
        id: number;
        ielts_answer_id: number;
        question: string;
        answer: string;
        ideal_answer: string;
    }[]>([]);
    
    const [partTwo, setPartTwo] = useState<
    {
        id: number;
        ielts_answer_id: number;
        question: string;
        shouldSay: string[]
        answer: string;
        ideal_answer: string;
    }>();
    
    const [partThree, setPartThree] = useState<
    {
        id: number;
        ielts_answer_id: number;
        question: string;
        answer: string;
        ideal_answer: string;
    }[]>([]);
        
    useEffect(()=>{
        fetchAnswer(id)
            .then(res => {
                setPartOne(res.partOne);
                setPartTwo(res.partTwo);
                setPartThree(res.partThree);
            });
    },[])

    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: 'Part1', 
            children: 
            <>
                {partOne.map(op=>
                    <div key={op.question} className="my-6">
                        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{op.question}</h2>
                        {op.answer}
                    </div>
                )}
            </>, 
            isOpen: false
        }, 
        { 
            key: 2, 
            title: 'Part2', 
            children: 
            <>
                <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{partTwo?.question}</div>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    {partTwo?.shouldSay.map(op => 
                        <li key={op}>
                            {op}
                        </li>
                    )}
                </ul>
                {partTwo?.answer}
            </>, 
            isOpen: false
        }, 
        { 
            key: 3, 
            title: 'Part3', 
            children: 
            <>
                {partThree.map(op=>
                    <div key={op.question} className="my-6">
                        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{op.question}</h2>
                        {op.answer}
                    </div>
                )}
            </>, 
            isOpen: false
        }, 
    ]); 
  
    const toggleAccordion = (accordionkey: number) => { 
        const updatedAccordions = accordions.map((accord) => { 
            if (accord.key === accordionkey) { 
                return { ...accord, isOpen: !accord.isOpen }; 
            } else { 
                return { ...accord, isOpen: false }; 
            } 
        }); 
  
        setAccordion(updatedAccordions); 
    }; 
    
    useEffect(()=>{
        const updatedAccordions = accordions.map((accord) => { 
            if (accord.key === 1) { 
                return { ...accord, children: 
                        <>
                            {partOne.map(op=>
                                <div key={op.question} className="my-6">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{op.question}</h2>
                                    {op.answer}
                                </div>
                            )}
                        </>,  
                }; 
            } else if (accord.key === 2) { 
                return { ...accord, children: 
                    <>
                        <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{partTwo?.question}</div>
                        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            {partTwo?.shouldSay.map(op => 
                                <li key={op}>
                                    {op}
                                </li>
                            )}
                        </ul>
                        {partTwo?.answer}
                    </> 
                }; 
            } else if (accord.key === 3) {
                return { ...accord, children: 
                        <>
                            {partThree.map(op=>
                                <div key={op.question} className="my-6">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{op.question}</h2>
                                    {op.answer}
                                </div>
                            )}
                        </>,  
                }; 
            } else {
                return accord;
            }
        });
        
        setAccordion(updatedAccordions);
    },[partOne, partTwo, partThree])

    return (
        <div className="flex flex-col items-center w-full">
            
            <div className="p-2 m-8 w-5/6 animate-fade-in-bottom"> 
                        <h2 className='text-2xl mb-2 mx-auto text-green-800'>Questions and Answers</h2> 
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
    
            
            <Link className="px-10 py-1 m-10 text-blue-500 border border-blue-500 font-semibold rounded hover:bg-blue-100 animate-fade-in" href={`/mypage`}>
                Return To Mypage
            </Link>
        </div>
    )
}

export default Answer
