import { GEMINI_URL } from "@/config/URL";
import { Response } from "./Response.type";

export const fetchQuestions = async () => {

    const requestBody_part1 = {
        contents: [{
            parts: [{
                text: "Give 6 to 7 questions of IELTS Speaking Part 1. Note them in one string and separate each questions with |."
            }]
        }]
    };

    const requestBody_part2 = {
        contents: [{
            parts: [{
                text: "Give a question of IELTS Speaking Part 2. Give a subject and 4 to 5 'You should say' words and state them in one string. As for the format, separate the subject and 'You shoud say' with '*',  'You should say' words with '|'."
            }]
        }]
    };
    
    const requestBody_part3 = {
        contents: [{
            parts: [{
                text: "Give 4 to 6 questions of IELTS Speaking Part 3. Note them in one string and separate each questions with |."
            }]
        }]
    };

    const response_part1 = await fetch(`${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody_part1),
        next: { revalidate: 300 }  // cached for 5 minutes
    });

    const response_part2 = await fetch(`${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody_part2),
        next: { revalidate: 300 }  // cached for 5 minutes
    });

    const response_part3 = await fetch(`${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody_part3),
        next: { revalidate: 300 }  // cached for 5 minutes
    });
    
    
    const question_string_part1 = await response_part1.json() as Response;
    const question_string_part2 = await response_part2.json() as Response;
    const question_string_part3 = await response_part3.json() as Response;
    
    let part1 = question_string_part1.candidates[0].content.parts[0].text.split('|');

    let part2 = question_string_part2.candidates[0].content.parts[0].text.split('*');
    let subject;
    let shouldSay;

    console.log(question_string_part2.candidates[0].content.parts[0].text);
    //when * does not appear
    //Experience | you should say when it happened | what you did | what you felt | why it was memorable
    if (part2.length === 1){
        part2 = part2[0].split('|');
        part2 = part2.filter(question => question !== '');
        subject = part2[0];
        shouldSay = part2.slice(1);
    }
    // when * appears 3 times
    // Topic* |You should say| A time you gave or received advice*|when|who you gave the advice to|what the advice was|why you gave the advice|how the person reacted|
    if (part2.length === 3){
        shouldSay = part2[2].split('|')
        shouldSay = shouldSay.filter(op => op !== '');

        let second = part2[1].split('|');
        second = second.filter(op => op !== '')
        subject = second[second.length - 1]
    }
    //when questions are in the correct format
    else{
        part2 = part2.filter(question => question !== '');
        subject = part2[0];
        shouldSay = part2[1].split('|');
    }

    let part3 = question_string_part3.candidates[0].content.parts[0].text.split('|');

    part1 = part1.filter(question => question !== '');
    
    // if the response started from '|'
    shouldSay = shouldSay.filter(question => !question.includes('You should say') && !question.includes('you should say') && question !== '' && question !== ' ');
    // if (shouldSay[0] === "" || shouldSay[0].includes('You should say')){
    //     shouldSay = shouldSay.slice(1);
    // }
    
    // if the response started from '|'
    // if (part3[0] === ""){
    //     part3 = part3.slice(1);
    // }
    part3 = part3.filter(question => question !== '');

    return {
        part1: part1,
        part2: {
            subject: subject,
            shouldSay: shouldSay
        },
        part3: part3
    }
}
