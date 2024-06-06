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
        interview_answer_id: number;
        question: string;
        answer: string;
        ideal_answer: string;
    }[]>([]);
    

    const fetchAndStoreAnswer = async () => {
        await fetchAnswer(id)
            .then(res => {
                setPartOne(res.partOne);
            });
    }
        
    useEffect(()=>{

        // 初期ローディングだけローディングダイアログを表示
        const initialLoad = async () => {
            setLoading(true);
            await fetchAndStoreAnswer();
            // ロード終了時にアコーディオンを開く
            toggleAccordion(1)
            setLoading(false);
        }

        initialLoad();
    },[])

    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: '', 
            children: <></>, 
            isOpen: false
        }
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
                            {partOne.map(op=><Content key={`one-${op.id}`} part='one' interview_answer_id={op.interview_answer_id} id={op.id} question={op.question} answer={op.answer} ideal_answer={op.ideal_answer} fetchAndStoreAnswer={fetchAndStoreAnswer} />)}
                        </>,  
                }; 
            } else {
                return accord;
            }
        });
        
        setAccordion(updatedAccordions);
    },[partOne])

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
