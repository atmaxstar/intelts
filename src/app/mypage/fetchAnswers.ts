export const fetchAnswers = async (test: 'ielts' | 'interview') => {
  const response = await fetch(`/api/${test}/${test}-answer`, {
    method: 'GET',
  })

  const body = (await response.json()) as {
    answers: {
      id: number
      tag: string
    }[]
  }

  // idを昇順にソート
  body.answers.sort((a, b) => a.id - b.id)

  return body.answers
}
