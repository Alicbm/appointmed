import { MouseEventHandler } from "react";

type Props = {
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  checked?: boolean;
}

export function InputCheck ({ label, checked, onClick }: Props) {
  return (
    <div>
      <input 
        type="checkbox" 
        name={label}
        id={label} 
        className="mr-2"
        checked={checked}
        onClick={onClick}
      />
      <label 
        htmlFor={label}
        className="text-md text-gray-600 sm:text-lg"
      >{ label }</label>
    </div>
  )
}