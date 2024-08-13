import Exam from './_exam/Exam'
import { fetchQuestions } from './_exam/fetchQuesion'

const page = async () => {
  const { part1, part2, part3 } = await fetchQuestions()

  return <Exam part1={part1} part2={part2} part3={part3} />
}

export default page
