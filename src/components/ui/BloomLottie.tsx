import { useLottie } from 'lottie-react'
import floralBloom from '../../assets/lottie/floralBloom'

interface BloomLottieProps {
  className?: string
  loop?: boolean
}

export function BloomLottie({ className, loop = true }: BloomLottieProps) {
  const { View } = useLottie(
    {
      animationData: floralBloom,
      autoplay: true,
      loop,
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
    },
    { width: '100%', height: '100%' },
  )

  return <div className={className}>{View}</div>
}
