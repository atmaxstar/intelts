import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { updateTag } from "./updateTag";

interface Props {
    test: 'ielts' | 'interview';
    id: number;
    tag: string;
    fetchAndStoreAnswers: () => void;
}

const Tag = ({test, id, tag, fetchAndStoreAnswers}: Props) => {
    const [editting, setEditting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState(tag);

    useEffect(() => {
        if(editting && inputRef.current){
            inputRef.current.focus();
        }
    },[editting])

    const finishEdit = async () => {

        setEditting(false);

        const idealAnswer = {
            test: test,
            id: id,
            tag: text,
        }

        await updateTag(idealAnswer);

        await fetchAndStoreAnswers();

    }

    const handleInputText = (e:ChangeEvent<HTMLInputElement>) => {
        // 25文字まで受けつける
        if(e.target.value.length <= 25){
            setText(e.target.value);
        }
    }

    return (
        <>
            <div className='flex justify-between items-center gap-3'>
                {
                    editting ? 
                    <input id="tag" ref={inputRef} onChange={handleInputText} value={text} onBlur={finishEdit} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
                    :
                    <div className='py-3 px-4 w-10/12 text-center font-medium text-gray-600'>
                        {text}
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
