
export const postAnswer = async (ieltsAnswer: {
    part1: {question: string, answer: string}[];
  }) => {

    const requestParameter = {
        partOne: ieltsAnswer.part1,
    }

    const response = await fetch('/api/interview/interview-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...requestParameter }),
    });

    const data = await response.json();
}

export const getAnswers = async () => {

    const response = await fetch('/api/ielts/ielts-answer');

    const answers: {id: number, tag: string}[] = await response.json();

    return answers;
}