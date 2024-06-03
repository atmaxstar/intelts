
export const fetchAnswer = async (id: number) => {

    const response = await fetch(`/api/ielts/ielts-answer/${id}`, {
        method: 'GET',
    });

    const body = await response.json() as {
        answer: {
            partOne: {
                id: number;
                ielts_answer_id: number;
                question: string;
                answer: string;
                ideal_answer: string;
            }[],
            partTwo: {
                id: number;
                ielts_answer_id: number;
                question: string;
                shouldSay: string[];
                answer: string;
                ideal_answer: string;
            },
            partThree: {
                id: number;
                ielts_answer_id: number;
                question: string;
                answer: string;
                ideal_answer: string;
            }[],
        }
    };
    
    return body.answer;

}