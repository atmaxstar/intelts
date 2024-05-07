import { GEMINI_URL } from "@/config/URL";
import { Response } from "./Response.type";

export const fetchQuestions = async () => {

    const requestBody = {
        contents: [{
            parts: [{
                text: "Give 6 to 8 behavioral questions. Note them in one string and separate each questions with |."
            }]
        }]
    };

    const response = await fetch(`${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        next: { revalidate: 120 }  // cached for 2 minutes
    });
    
    const question_string = await response.json() as Response;

    let questions = question_string.candidates[0].content.parts[0].text.split('|');
    questions = questions.filter(question => question !== '');
    
    return questions;
}
