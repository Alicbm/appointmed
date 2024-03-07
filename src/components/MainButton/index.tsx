import { MouseEventHandler } from "react";

type Props = {
  text: string;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function MainButton ({ text, className, onClick }: Props) {
  return (
    <button 
      className={`bg-blue-700 text-white text-lg px-4 py-2 rounded-md hover:bg-blue-800 ${className}`}
      onClick={onClick}
    >
      { text }
    </button>
  )
}