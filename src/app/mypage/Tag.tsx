import Image from "next/image"
import { useState } from "react";
import { updateTag } from "./updateTag";

interface Props {
    test: 'ielts' | 'interview';
    id: number;
    tag: string;
    fetchAndStoreAnswers: () => void;
}

const Tag = ({test, id, tag, fetchAndStoreAnswers}: Props) => {
    const [editting, setEditting] = useState(false);
    const [text, setText] = useState(tag);

    
    const finishEdit = async () => {

        const idealAnswer = {
            test: test,
            id: id,
            tag: text,
        }

        await updateTag(idealAnswer);

        await fetchAndStoreAnswers();

        setEditting(false);
    }

    return (
        <>
            <div className='flex justify-between items-center gap-3'>
                {
                    editting ? 
                    <input id="tag" onChange={(e) => setText(e.target.value)} value={text} onBlur={finishEdit} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
                    :
                    <div className='py-3 px-4 text-center font-medium text-gray-600'>
                        {tag}
                    </div>
                }
                <button onClick={()=>setEditting(true)}>
                    <Image width={20} height={20} src={'/pencil.svg'} alt='pencil'/>
                </button>
            </div>
        </>
    )
}

export default Tag
