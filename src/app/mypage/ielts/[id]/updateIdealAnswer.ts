
export const updateIdealAnswer = async (idealAnswer: {
    part: 'one' | 'two' | 'three';
    id: number;
    ielts_answer_id: number;
    ideal_answer: string;
  }) => {

    const requestParameter = {
        id: idealAnswer.id,
        ielts_answer_id: idealAnswer.ielts_answer_id,
        ideal_answer: idealAnswer.ideal_answer,
    }

    await fetch(`/api/ielts/part-${idealAnswer.part}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...requestParameter }),
    });

}
