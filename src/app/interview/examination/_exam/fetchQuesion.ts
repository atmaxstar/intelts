import { GEMINI_URL } from '@/config/URL'
import type { Response } from './Response.type'

export const fetchQuestions = async () => {
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: 'Give 6 to 8 behavioral questions. Note them in one string and separate each questions with |.',
          },
        ],
      },
    ],
  }

  const response = await fetch(
    `${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      next: { revalidate: 120 }, // cached for 2 minutes
    },
  )

  const responseBody = (await response.json()) as Response

  // 欲しい文字列の形
  //What are the advantages and disadvantages of using public transportation? | How do you think technology has changed the way people communicate? | What are the benefits and challenges of online learning? | How has the role of education changed in recent years? |  What are the advantages and disadvantages of living in a multicultural society? | Do you think globalization has had a positive or negative impact on the world?
  // 文字列に改行が入っている事があるので削除する
  const questions_string =
    responseBody.candidates[0].content.parts[0].text.replace(/\n/g, '')
  const questions = questions_string.split('|')
  questions.filter((question) => question !== '')

  return questions
}
