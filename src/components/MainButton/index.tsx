import { MouseEventHandler } from "react";

enum TypeButton {
  button = 'button',
  reset = 'reset',
  submit =  "submit",
}

type Props = {
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: TypeButton;
}

export function MainButton ({ text, className, onClick, type }: Props) {
  return (
    <button 
      type={type || 'button'}
      className={`flex justify-center items-center text-white text-lg px-4 py-2 rounded-md ${className}`}
      onClick={onClick}
    >
      { text }
    </button>
  )
}