import { MouseEventHandler } from "react";
import { TypeButton } from "../../types";

type Props = {
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: TypeButton;
  disabled?: boolean
}

export function MainButton ({ text, className, onClick, type, disabled }: Props) {
  return (
    <button 
      type={type || 'button'}
      className={`flex justify-center items-center text-white text-lg px-4 py-2 rounded-md ${className} ${disabled ? 'opacity-[.5]' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      { text }
    </button>
  )
}