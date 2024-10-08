export const fetchAnswer = async (id: number) => {
  const response = await fetch(`/api/interview/interview-answer/${id}`, {
    method: 'GET',
  })

  const body = (await response.json()) as {
    answer: {
      partOne: {
        id: number
        interview_answer_id: number
        question: string
        answer: string
        ideal_answer: string
      }[]
    }
  }

  // idを昇順にソート
  body.answer.partOne.sort((a, b) => a.id - b.id)

  return body.answer
}
