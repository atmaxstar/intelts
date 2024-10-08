import prisma from '@/lib/prisma'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const params: {
    id: number
    ielts_answer_id: number
    ideal_answer: string
  } = await req.json()

  await prisma.ieltsPartTwo
    .update({
      where: {
        id: params.id,
        ielts_answer_id: params.ielts_answer_id,
      },
      data: {
        ideal_answer: params.ideal_answer,
      },
    })
    .catch((err) => {
      console.log(err)
      return NextResponse.json({ error: 'Failed to Update' }, { status: 400 })
    })

  return NextResponse.json({ message: 'Answers Updated' }, { status: 200 })
}

// export default async function handle(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {

//     if (req.method === 'PUT'){

//         type UpdateAnswerParam = {
//             id: number;
//             ielts_answer_id: number;
//             ideal_answer: string;
//         }

//         const updateParam: UpdateAnswerParam = req.body;

//         await prisma.ieltsPartTwo.update({
//             where: {
//                 id: updateParam.id,
//                 ielts_answer_id: updateParam.ielts_answer_id
//             },
//             data: {
//                 ideal_answer: updateParam.ideal_answer,
//             },
//         })

//         res.status(200);

//   }

// }
