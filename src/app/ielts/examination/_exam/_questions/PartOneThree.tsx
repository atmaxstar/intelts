'use client'

import { useState } from "react"
import Question from "./Question";

interface Props {
    questions: string[];
    part: 'part1' | 'part3';
    gotoNextPart: () => void;
    appendAnswer: ({ques, ans}: {ques: string, ans: string}) => void;
}

const PartOneThree = ({ questions, part, gotoNextPart, appendAnswer }: Props) => {
    const [idx, setIdx] = useState(0);

    const handleNext = () =>{
        if (idx === questions.length - 1){
            gotoNextPart();
        }
        else{
            setIdx(prev => prev + 1);
        }
    }

    return (
        <>
            {questions.map((question, index) =>
                <>
                    {idx === index && <Question key={question} question={question} part={part} handleNext={handleNext} appendAnswer={appendAnswer}/>}
                </>
            )}
        </>
    )
}

export default PartOneThree
