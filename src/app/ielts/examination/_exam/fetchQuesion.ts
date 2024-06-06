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
        next: { revalidate: 120 }  // cached for 2 minutes
    });

    const response_part2 = await fetch(`${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody_part2),
        next: { revalidate: 120 }  // cached for 2 minutes
    });

    const response_part3 = await fetch(`${GEMINI_URL}?key=` + process.env.GEMINI_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody_part3),
        next: { revalidate: 120 }  // cached for 2 minutes
    });
    
    
    const responseBody_part1 = await response_part1.json() as Response;
    const responseBody_part2 = await response_part2.json() as Response;
    const responseBody_part3 = await response_part3.json() as Response;
    
    // 欲しい文字列
    // What is your name? | What do you do for a living? | Where are you from? | What do you like to do in your free time? | What's your favorite place in your hometown? | Do you like to read? | What kind of music do you listen to?
    
    // 文字列に改行が入っている事があるので削除する
    let part1_string = responseBody_part1.candidates[0].content.parts[0].text.replace(/\n/g, '');
    let part1 = part1_string.split('|');
    // 空白の質問を削除
    part1 = part1.filter(question => question !== '');

    // 欲しい文字列
    // A time you gave or received advice * who you gave the advice to|what the advice was | why you gave the advice | how the person reacted
    // 文字列に改行が入っている事があるので削除する
    let part2_string = responseBody_part2.candidates[0].content.parts[0].text.replace(/\n/g, '');
    let part2 = part2_string.split('*');
    let subject;
    let shouldSay;

    // * が現れなかった場合
    //Experience | you should say when it happened | what you did | what you felt | why it was memorable
    if (part2.length === 1){
        part2 = part2[0].split('|');
        part2 = part2.filter(question => question !== '');
        subject = part2[0];
        shouldSay = part2.slice(1);
    }
    // * が3回現れた場合
    // Topic* |You should say| A time you gave or received advice*|when|who you gave the advice to|what the advice was|why you gave the advice|how the person reacted|
    else if (part2.length === 3){
        shouldSay = part2[2].split('|')
        shouldSay = shouldSay.filter(op => op !== '');

        let second = part2[1].split('|');
        second = second.filter(op => op !== '')
        subject = second[second.length - 1]
    }
    // 欲しい文字列の型になっていた場合
    else{
        part2 = part2.filter(question => question !== '');
        subject = part2[0];
        shouldSay = part2[1].split('|');
    }

    // you should sayと空白のものを削除
    shouldSay = shouldSay.filter(question => !question.includes('You should say') && !question.includes('you should say') && question !== '' && question !== ' ');

    // 欲しい文字列
    //What are the advantages and disadvantages of using public transportation? | How do you think technology has changed the way people communicate? | What are the benefits and challenges of online learning? | How has the role of education changed in recent years? |  What are the advantages and disadvantages of living in a multicultural society? | Do you think globalization has had a positive or negative impact on the world?
    // 文字列に改行が入っている事があるので削除する
    let part3_string = responseBody_part3.candidates[0].content.parts[0].text.replace(/\n/g, '');
    let part3 = part3_string.split('|');
    // 空白の質問を削除
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
