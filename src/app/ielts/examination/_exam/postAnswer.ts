
export const postAnswer = async (ieltsAnswer: {
    part1: {question: string, answer: string}[];
    part2: {subject: string, shouldSay: string[], answer: string};
    part3: {question: string, answer: string}[];
  }) => {

    const requestParameter = {
        partOne: ieltsAnswer.part1,
        partTwo: ieltsAnswer.part2,
        partThree: ieltsAnswer.part3,
    }

    const response = await fetch('/api/ielts/ielts-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...requestParameter }),
    });

    const data = await response.json();
    console.log(data);
}

export const getAnswers = async () => {

    const response = await fetch('/api/ielts/ielts-answer');

    const answers: {id: number, tag: string}[] = await response.json();

    return answers;
}