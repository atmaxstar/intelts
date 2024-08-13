import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authOptions } from '../../../../lib/auth'

// model InterviewAnswer {
//     id          Int    @id @default(autoincrement())
//     tag         String
//     user_id     String
//     partOne     InterviewPartOne[]
// }

//   model InterviewPartOne {
//     id    Int    @id @default(autoincrement())
//     interview_answer_id Int
//     interview_answer  InterviewAnswer @relation(fields: [interview_answer_id], references: [id])
//     question    String
//     answer      String
//     ideal_answer  String
// }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  const params: {
    partOne: { question: string; answer: string }[]
  } = await req.json()

  const partOne = params.partOne.map((po) => {
    return {
      question: po.question,
      answer: po.answer,
      ideal_answer: '',
    }
  })

  // current time
  const date = new Date()
  const formattedDate =
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2) +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ':' +
    ('0' + date.getSeconds()).slice(-2) +
    '.' +
    date.getMilliseconds()

  if (userId) {
    await prisma.interviewAnswer
      .create({
        data: {
          user_id: userId,
          tag: formattedDate,
          partOne: {
            create: partOne,
          },
        },
      })
      .catch((err) => {
        console.log(err)
        return NextResponse.json({ error: 'Failed to Store' }, { status: 400 })
      })
  } else {
    return NextResponse.json({ error: 'Invalid Request' }, { status: 400 })
  }

  return NextResponse.json({ message: 'Answers Stored' }, { status: 200 })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  const answers = await prisma.interviewAnswer
    .findMany({
      where: { user_id: userId },
      select: {
        id: true,
        tag: true,
      },
    })
    .catch((err) => {
      console.log(err)
      return NextResponse.json(
        { error: 'Failed to Fetch Answers' },
        { status: 400 },
      )
    })

  return NextResponse.json({ answers }, { status: 200 })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  const params: {
    id: number
    tag: string
  } = await req.json()

  await prisma.interviewAnswer
    .update({
      where: {
        id: params.id,
        user_id: userId,
      },
      data: {
        tag: params.tag,
      },
    })
    .catch((err) => {
      console.log(err)
      return NextResponse.json({ error: 'Failed to Update' }, { status: 400 })
    })

  return NextResponse.json({ message: 'Tags Updated' }, { status: 200 })
}
