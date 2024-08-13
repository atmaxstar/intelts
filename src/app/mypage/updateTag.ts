export const updateTag = async (answer: {
  test: 'ielts' | 'interview'
  id: number
  tag: string
}) => {
  const requestParameter = {
    id: answer.id,
    tag: answer.tag,
  }

  await fetch(`/api/${answer.test}/${answer.test}-answer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...requestParameter }),
  })
}
