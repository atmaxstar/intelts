'use client'
import React, { useEffect, useState } from 'react'
import { fetchAnswer } from './fetchAnswer';
import Link from 'next/link';
import Accordion from "@/Components/Accordion";
import Content from './Content';
import LoadingDialog from '@/Components/LoadingDialog';

interface Props {
    id: number;
}

const Answer = ({id}: Props) => {
    const [loading, setLoading] = useState(false);

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

    const fetchAndStoreAnswer = async () => {

        await fetchAnswer(id)
            .then(res => {
                setPartOne(res.partOne);
                setPartTwo(res.partTwo);
                setPartThree(res.partThree);
            });
        
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

    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: 'Part1', 
            children: <></>, 
            isOpen: false
        }, 
        { 
            key: 2, 
            title: 'Part2', 
            children: <></>, 
            isOpen: false
        }, 
        { 
            key: 3, 
            title: 'Part3', 
            children: <></>,
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
                            {partOne.map(op=><Content key={`one-${op.id}`} part='one' id={op.id} ielts_answer_id={op.ielts_answer_id} question={op.question} answer={op.answer} ideal_answer={op.ideal_answer} fetchAndStoreAnswer={fetchAndStoreAnswer} />)}
                        </>,  
                }; 
            } else if (accord.key === 2) { 
                return { ...accord, children: 
                    <>
                        {partTwo && <Content key={`one-${partTwo.id}`} part='one' id={partTwo.id} ielts_answer_id={partTwo.ielts_answer_id} question={partTwo.question} shouldSay={partTwo.shouldSay} answer={partTwo.answer} ideal_answer={partTwo.ideal_answer} fetchAndStoreAnswer={fetchAndStoreAnswer} />}
                    </> 
                }; 
            } else if (accord.key === 3) {
                return { ...accord, children: 
                        <>
                            {partThree.map(op=><Content key={`three-${op.id}`} part='three' id={op.id} ielts_answer_id={op.ielts_answer_id} question={op.question} answer={op.answer} ideal_answer={op.ideal_answer} fetchAndStoreAnswer={fetchAndStoreAnswer} />)}
                        </>,  
                }; 
            } else {
                return accord;
            }
        });
        
        setAccordion(updatedAccordions);
    },[partOne, partTwo, partThree])

    return (
        <>
        
        {loading && <LoadingDialog/>}
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
        </>
    )
}

export default Answer
