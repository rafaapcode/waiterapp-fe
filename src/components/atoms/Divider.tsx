import { cn } from '@/utils/cn';

interface  DividerProps {
  className?: string;
}

function Divider({className}: DividerProps) {
  return (
    <div className={cn('w-full h-[2px] bg-gray-200  rounded-4xl my-2', className)}/>
  )
}

export default Divider
