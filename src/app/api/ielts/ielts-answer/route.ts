import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    
    const params : {
        partOne: {question: string, answer: string}[];
        partTwo: {subject: string, shouldSay: string[], answer: string};
        partThree: {question: string, answer: string}[];
    } = await req.json()

    const partOne = params.partOne.map(po => {
      return {
        question: po.question,
        answer: po.answer,
        ideal_answer: '',
      }
    })

    const partTwo = {
      question: params.partTwo.subject,
      shouldSay: params.partTwo.shouldSay,
      answer: params.partTwo.answer,
      ideal_answer: '',
    }

    const partThree = params.partThree.map(pt => {
      return {
        question: pt.question,
        answer: pt.answer,
        ideal_answer: '',
      }
    })
  
    // current time
    const date = new Date();
    const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();

    if(userId){
        await prisma.ieltsAnswer.create({
          data: {
            user_id: userId,
            tag: formattedDate,
            partOne: {
              create: partOne,
            },
            partTwo: {
              create: partTwo,
            },
            partThree: {
              create: partThree,
            }
          },
        })
        .catch(err => {
            console.log(err);
            return NextResponse.json({error:"Failed to Store"}, { status: 400 })
        })
    }
    else{
        return NextResponse.json({error:"Invalid Request"}, { status: 400 })
    }
    
    return NextResponse.json({message:"Answers Stored"}, { status: 200 })
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const answers = await prisma.ieltsAnswer.findMany({
      where: { user_id: userId },
      select: {
        id: true, 
        tag: true,
      }
    })
    .catch(err => {
        console.log(err);
        return NextResponse.json({error:"Failed to Fetch Answers"}, { status: 400 })
    })

    return NextResponse.json({ answers }, { status: 200 })
}

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    
    const params : {
        id: number;
        tag: string;
    } = await req.json()

    await prisma.ieltsAnswer.update({
        where: {
            id: params.id,
            user_id: userId
        },
        data: {
            tag: params.tag,
        },
    })
    .catch((err) => {
        console.log(err);
        return NextResponse.json({error:"Failed to Update"}, { status: 400 })
    })
    
    return NextResponse.json({message:"Tags Updated"}, { status: 200 })
}

// export default async function handle(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
    
//   const session = await getServerSession(authOptions);
//   const userId = session?.user.id;

//   if (req.method === 'POST') {
  
//     const ieltsAnswer: {
//       partOne: {question: string, answer: string}[];
//       partTwo: {subject: string, shouldSay: string[], answer: string};
//       partThree: {question: string, answer: string}[];
//     } = req.body;

//     const partOne = ieltsAnswer.partOne.map(po => {
//       return {
//         question: po.question,
//         answer: po.answer,
//         ideal_answer: '',
//       }
//     })

//     const partTwo = {
//       question: ieltsAnswer.partTwo.subject,
//       shouldSay: ieltsAnswer.partTwo.shouldSay,
//       answer: ieltsAnswer.partTwo.answer,
//       ideal_answer: '',
//     }

//     const partThree = ieltsAnswer.partThree.map(pt => {
//       return {
//         question: pt.question,
//         answer: pt.answer,
//         ideal_answer: '',
//       }
//     })
  
//     // current time
//     const date = new Date();
//     const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();

//     const result = await prisma.ieltsAnswer.create({
//       data: {
//         tag: formattedDate,
//         partOne: {
//           create: partOne,
//         },
//         partTwo: {
//           create: partTwo,
//         },
//         partThree: {
//           create: partThree,
//         }
//       },
//     });

//     res.status(200).json(result);

//   } else if (req.method === 'GET') {
//     const answers = await prisma.ieltsAnswer.findMany({
//       where: { user_id: userId },
//       select: {
//         id: true, 
//         tag: true,
//       }
//     })

//     res.status(200).json(answers);

//   } else if (req.method === 'PUT'){
//     // update the name of tag

//     type UpdateTagParam = {
//       id: number;
//       tag: string;
//     }
  
//     const updateParam: UpdateTagParam = req.body;

//     await prisma.ieltsAnswer.update({
//         where: {
//         id: updateParam.id,
//         user_id: userId
//         },
//         data: {
//         tag: updateParam.tag,
//         },
//     })

//   }

// }