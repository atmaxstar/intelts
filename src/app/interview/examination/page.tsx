import Exam from "./_exam/Exam";
import { fetchQuestions } from "./_exam/fetchQuesion";

const page = async () => {
    const questions = await fetchQuestions();

    return (
        <Exam questions={questions}/>
    )
}

export default page
