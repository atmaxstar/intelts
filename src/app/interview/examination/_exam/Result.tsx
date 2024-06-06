import Accordion from "@/Components/Accordion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { postAnswer } from "./postAnswer";

interface Props{
    answer: {question: string, answer: string}[]
}

const Result = ({answer}: Props) => { 

    const { data } = useSession();
    
    useEffect(()=>{

        if (data?.user.id){
            postAnswer({part1: answer});
        }

    },[data?.user.id])

    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: '', 
            children: 
            <>
                {answer.map(op=>
                    <div key={op.question} className="my-6">
                        <div className="mb-2 text-lg font-semibold text-gray-900">{op.question}</div>
                        <span className="mb-2 text-base font-semibold text-gray-900">Your Answer</span>
                        <div className='w-11/12 min-h-10 break-words whitespace-pre-wrap border border-black border-1 rounded-md p-2'>
                            {op.answer}
                        </div>
                    </div>
                )}
            </>, 
            isOpen: true
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
