'use client'

import { getServerSession } from "next-auth"; // 2⃣
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { authOptions } from "../../lib/auth";
import IELTSTable from "./IELTSTable";
import Link from "next/link";
import { robotoslab } from "@/utils/font";
import InterviewTable from "./InterviewTable";

const page = () => {

  return (
    <div className="flex flex-col">
      <div className="flex justify-end w-full p-8">
        <Link
          className="relative inline-flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-md hover:text-white group hover:bg-gray-50"
          href='/logout'
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease" />
          <span className="relative">
            Logout
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center gap-3">
          <span className={`text-2xl font-bold text-red-500 ${robotoslab.className}`}>IELTS</span>
          <IELTSTable/>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className={`text-2xl font-bold text-indigo-500 ${robotoslab.className}`}>Interview</span>
          <InterviewTable/>
        </div>
      </div>
      
      <Link className="px-10 py-1 mt-10 mx-auto text-blue-500 border border-blue-500 font-semibold rounded hover:bg-blue-100" href={`/`}>
                Return To HomePage
      </Link>
    </div>
  );
}

export default page