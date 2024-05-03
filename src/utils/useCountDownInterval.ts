import { useEffect } from 'react'

const useCountDownInterval = (
  countTime: number | null,
  setCountTime: (arg0: number) => void,
  onEnd: () => void
) => {
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (countTime === 0) {
        clearInterval(countDownInterval);
        onEnd();
      }
      if (countTime && countTime > 0) {
        setCountTime(countTime - 1);
      }
    }, 1000)    //execute per 1000ms = 1s
    return () => {
      clearInterval(countDownInterval);
    }
  }, [countTime])
}

export { useCountDownInterval }