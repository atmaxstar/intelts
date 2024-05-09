import Accordion from "@/Components/Accordion";
import Link from "next/link";
import { useState } from "react";

interface Props{
    answer: {question: string, answer: string}[]
}

const Result = ({answer}: Props) => { 

    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: '', 
            children: 
            <>
                {answer.map(op=>
                    <div key={op.question} className="my-6">
                        <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{op.question}</div>
                        {op.answer}
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
