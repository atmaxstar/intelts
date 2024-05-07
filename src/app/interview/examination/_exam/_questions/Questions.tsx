'use client'

import { useState } from "react"
import Question from "./Question";

interface Props {
    questions: string[];
    gotoNextPart: () => void;
    appendAnswer: ({ques, ans}: {ques: string, ans: string}) => void;
}

const Questions = ({ questions, gotoNextPart, appendAnswer }: Props) => {
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
                    {idx === index && <Question question={question} handleNext={handleNext} appendAnswer={appendAnswer}/>}
                </>
            )}
        </>
    )
}

export default Questions
