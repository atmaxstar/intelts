import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { updateIdealAnswer } from "./updateIdealAnswer";

interface Props {
    part: 'one' | 'two' | 'three';
    id: number;
    ielts_answer_id: number;
    question: string;
    shouldSay?: string[];
    answer: string;
    ideal_answer: string;
    fetchAndStoreAnswer: () => void;
}

const Content = ({part, id, ielts_answer_id, question, shouldSay, answer, ideal_answer, fetchAndStoreAnswer}: Props) => {
    const [editting, setEditting] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState(ideal_answer);
    
    // 編集が始まったらテキストボックスにフォーカス
    useEffect(() => {
        if(editting && inputRef.current){
            inputRef.current.focus();
        }
    },[editting])

    const finishEdit = async () => {

        setEditting(false);

        const idealAnswer = {
            id: id,
            ielts_answer_id: ielts_answer_id,
            ideal_answer: text,
        }

        await updateIdealAnswer({part: part, ...idealAnswer});

        await fetchAndStoreAnswer();
    }

    return (
        <div className="flex flex-col my-6">
            <span className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{question}</span>
            {shouldSay && 
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    {shouldSay.map(op => 
                        <li key={op}>
                            {op}
                        </li>
                    )}
                </ul>
            }
            <span className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Your Answer</span>
            <div className='w-11/12 min-h-10 break-words whitespace-pre-wrap border border-black border-1 rounded-md p-2'>
                {answer}
            </div>
            <span className="mb-2 text-base font-semibold text-gray-900 dark:text-white">Ideal Answer</span>
            <div className='flex justify-between items-center gap-3'>
                {
                    editting ? 
                    <textarea id="ideal-answer" ref={inputRef} onChange={(e) => setText(e.target.value)} value={text} onBlur={finishEdit} rows={4} className="block p-2.5 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
                    :
                    <div className='w-11/12 min-h-10 break-words whitespace-pre-wrap border border-black border-1 rounded-md p-2'>
                        {text}
                    </div>
                }
                <button onClick={()=>setEditting(true)}>
                    <Image width={20} height={20} src={'/pencil.svg'} alt='pencil'/>
                </button>
            </div>
        </div>
    )
}

export default Content
