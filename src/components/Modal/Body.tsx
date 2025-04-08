import { ReactNode } from 'react';

interface BodyProps {
  children: ReactNode;
  className: string;
}

function Body({children, className}: BodyProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default Body
