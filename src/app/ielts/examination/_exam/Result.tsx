import Accordion from "@/Components/Accordion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { postAnswer } from "./postAnswer";
import { useSession } from "next-auth/react";

interface Props{
    answer: {
        part1: {question: string, answer: string}[];
        part2: {subject: string, shouldSay: string[], answer: string};
        part3: {question: string, answer: string}[];
    }
}
const Result = ({answer}: Props) => { 

    const { data } = useSession();
    
    useEffect(()=>{

        if (data?.user.id){
            postAnswer(answer);
        }

    },[data?.user.id])

    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: 'Part1', 
            children: 
            <>
                {answer.part1.map(op=>
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
                <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{answer.part2.subject}</div>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    {answer.part2.shouldSay.map(op => 
                        <li key={op}>
                            {op}
                        </li>
                    )}
                </ul>
                {answer.part2.answer}
            </>, 
            isOpen: false
        }, 
        { 
            key: 3, 
            title: 'Part3', 
            children: 
            <>
                {answer.part3.map(op=>
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

        
        <Link className="px-10 py-1 m-10 text-blue-500 border border-blue-500 font-semibold rounded hover:bg-blue-100 animate-fade-in" href={`/`}>
            Return To Home
        </Link>
    </div>
  )
}

export default Result
