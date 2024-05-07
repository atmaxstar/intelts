'use client'

import { useState } from "react";
import { usePartManager } from "./usePartManager";
import Result from "./Result";
import Questions from "./_questions/Questions";


type Answer = {question: string, answer: string}[];

interface Props {
    questions: string[];
}

  
const Exam = ({questions}: Props) => {

    const { part, gotoNextPart } = usePartManager();
    const [answer, setAnswer] = useState<Answer>([]);

    const appendAnswer = ({ques, ans}: {ques: string, ans: string}) =>{
      setAnswer((prev) => {return [...prev, {question: ques, answer: ans}]})
    }

    return (
      <>
        {part === 'exam' && <Questions questions={questions} gotoNextPart={gotoNextPart} appendAnswer={appendAnswer}/>}
        {part === 'end' && <Result answer={answer}/>}
      </>
    )

}
  

export default Exam
