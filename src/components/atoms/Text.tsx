import { cn } from '@/utils/cn'
import { ComponentProps } from 'react'

interface TextProps extends ComponentProps<'p'> {}

function Text(props: TextProps) {
  return (
    <p {...props} className={cn('text-[#666666] font-medium', props.className)}>{props.children}</p>
  )
}

export default Text
