import Selection_IELTS from "@/Components/Selection_IELTS";
import Selection_Interview from "@/Components/Selection_Interview";
import Header from "@/Layout/Header";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Header/>
    <main className="flex h-5/6 flex-col items-center justify-center p-24">
      <div className="text-[min(5vw,25px)] p-5">
        Select which you practice
      </div>
      <div className="flex flex-col w-full mb-10 sm:flex-row gap-10">
        <Selection_IELTS/>
        <Selection_Interview/>
      </div>
    </main>
    </>
  );
}
