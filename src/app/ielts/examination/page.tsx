
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Question from "./_exam/_questions/Question";
import Exam from "./_exam/Exam";
import { Provider } from "react-redux";
import store from "@/lib/redux/store";
import { fetchQuestions } from "./_exam/fetchQuesion";


const page = async () => {
    const { part1, part2, part3 } = await fetchQuestions();

    return (
        <Exam part1={part1} part2={part2} part3={part3}/>
  )
}

export default page
