import { useState } from "react";

type Props = {
  label: string;
  type?: string;
}

export function Input ({ label, type }: Props) {
  const [text, setText] = useState('')

  return (
    <div className="relative flex items-end w-full h-[55px] bg-gray-100 rounded-md">
      <input 
        id={label} 
        type={type || 'text'} 
        name={label} 
        className="w-full h-full bg-transparent peer outline-none px-4 pt-6 rounded-md border border-gray-200 focus:border-2 focus:border-blue-600"
        onChange={(e) => setText(e.target.value)}
      />
      <label 
        htmlFor={label}
        className={`${text.length > 0 ?  'top-1 left-3 text-blue-600' : ''} absolute top-[16px] left-4 text-gray-500 transition-all peer-focus:top-1 peer-focus:left-3 peer-focus:text-blue-600`}
      >{label}</label>
    </div>
  )
}