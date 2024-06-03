
export const fetchAnswers = async () => {

    const response = await fetch('/api/ielts/ielts-answer', {
        method: 'GET',
    });

    const body = await response.json() as {
        answers: {
            id: number, 
            tag: string,
        }[]
};

    return body.answers;

}