'use client'

import PartOneThree from "./_questions/PartOneThree";
import { usePartManager } from "./usePartManager";

interface Props {
    part1: string[];
    part2: {
      subject: string;
      shouldSay: string[];
    };
    part3: string[];
  }

  
const Exam = ({part1, part2, part3}: Props) => {
    const { part, gotoNextPart } = usePartManager();
    return (
      <>
        {part === 'part1' && <PartOneThree questions={part1} part="part1" gotoNextPart={gotoNextPart}/>}
        {part === 'part3' && <PartOneThree questions={part3} part="part3" gotoNextPart={gotoNextPart}/>}
      </>
    )
  }
  

export default Exam
