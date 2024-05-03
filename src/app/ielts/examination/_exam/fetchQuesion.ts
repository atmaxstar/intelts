import { GEMINI_URL } from "@/config/URL";
import { Response } from "../Response.type";

export const fetchQuestions = async () => {

    const requestBody = {
        contents: [{
            parts: [{
                text: "Please give me questions for the speaking section of IELTS. Please submit them under the following conditions. Write part1, part2, and part3 in this order. No headings for part1, part2, and part3 questions, just separate each part with *. Separate each question of part1 and part3 with |. In part2, separate the subject and you should say with || and separate you should say with |. For part1, give 6 to 8 questions. For part3, please submit 4 to 6 questions. For part2, please submit 4 you should say questions."
            }]
        }]
    };

    const response = await fetch(`${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        next: { revalidate: 300 }  // cached for 5 minutes
    });
    
    const question_string = await response.json() as Response;
    //part1: | What is your name? | Where are you from? | What is your occupation? | What do you like doing in your free time? | What is your favorite food? | Do you like to travel? | Have you ever been to another country? |
    //part2: | A memorable journey || You should say: | When and where it was | Who you went with | What you did | And explain why this journey was so memorable for you |
    //part3: | Do you ever watch movies? | Why do you think people like to watch movies? | Do you think movies have a positive or negative impact on society? | How has technology changed the way we watch movies? |
    const [ , part1, part2, part3 ] = question_string.candidates[0].content.parts[0].text.split('*');
    console.log(question_string.candidates[0].content.parts[0].text.split('*'))

    console.log(part1)
    console.log(part2)
    console.log(part3)

    return {
        part1: part1.split('|').slice(1),
        part2: {
            subject: part2.split('||')[0].split('|')[1],
            shouldSay: part2.split('||')[1].split('|').slice(1)
        },
        part3: part3.split('|').slice(1)
    }
}