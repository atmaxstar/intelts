
export const updateIdealAnswer = async (idealAnswer: {
    part: 'one' | 'two' | 'three';
    id: number;
    interview_answer_id: number;
    ideal_answer: string;
  }) => {

    const requestParameter = {
        id: idealAnswer.id,
        interview_answer_id: idealAnswer.interview_answer_id,
        ideal_answer: idealAnswer.ideal_answer,
    }

    await fetch(`/api/interview/part-${idealAnswer.part}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...requestParameter }),
    });

}
