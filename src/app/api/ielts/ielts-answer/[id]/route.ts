import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const answer = await prisma.ieltsAnswer.findFirst({
        where: { 
            id: Number(params.id),
            user_id: userId,
        },
        select: {
            partOne: true,
            partTwo: true,
            partThree: true,
        }
    })
    .catch(err => {
        console.log(err);
        return NextResponse.json({error:"Failed to Fetch Answer"}, { status: 400 })
    })

    return NextResponse.json({ answer }, { status: 200 })
}