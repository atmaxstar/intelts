import { useCountDownInterval } from "@/utils/useCountDownInterval";
import { useEffect, useState } from "react";
import { FaStop } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface Props {
    question: {
        subject: string;
        shouldSay: string[]
    },
    handleNext: () => void,
    addAnswer: ({subject, shouldSay, answer}:{subject: string, shouldSay: string[], answer: string}) => void
}

const PartTwo = ({question, handleNext, addAnswer}: Props) => {
  const [prepTime, setPrepTime] = useState<number>(70);
  const [countTime, setCountTime] = useState<number>(190);
  const [preparing, setPreparing] = useState(false);
  useCountDownInterval(prepTime, setPrepTime, () => handleFinishPreparation());
  useCountDownInterval(countTime, setCountTime, () => handleFinished());

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    return () => {
        SpeechRecognition.stopListening();
    }
  },[])

  const handleAnimated = () =>{
    setTimeout(() => {
      setPreparing(true);
    }, 10000);
  };

  const handleFinishPreparation = () =>{
    setPreparing(false);
    setTimeout(() => {
        SpeechRecognition.startListening({ language: 'en-US', continuous: true })
    }, 5);
  }
  
  const handleFinished = async () =>{
    await SpeechRecognition.stopListening();
    await addAnswer({subject: question.subject, shouldSay: question.shouldSay, answer: transcript})
    await resetTranscript();
    handleNext();
  }

  return (
    <div className="flex flex-col justify-center items-center h-4/6 gap-2">
        
        <div className='animate-fade-in-bottom text-xl font-bold'>
            {question.subject}
        </div>
        <ul className="text-md animate-fade-in" onAnimationEnd={handleAnimated}>
          You should say
          {question.shouldSay.map(op =><li key={op}>・{op}</li>)}
        </ul>
    
        {preparing && 
            <div>
              Preparation Time {`${prepTime}s left`}
            </div>
        }

        {listening && 
        <>
            <button className="flex flex-row justify-center items-center gap-2" type="button" onClick={() => handleFinished()}>
                <FaStop color="red"/>
                Stop Recording
            </button>

            <div>{`${countTime}s left`}</div>
        </>
        }
        <div className="w-1/2">{transcript}</div>
    </div>
  )
}

export default PartTwo
