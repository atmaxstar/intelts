
export const fetchAnswers_IELTS = async () => {

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

export const fetchAnswers_Interview = async () => {

    const response = await fetch('/api/interview/interview-answer', {
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