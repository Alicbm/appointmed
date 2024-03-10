type Props = {
  text: string;
}

export function SubtitleInputs ({ text } : Props) {
  return ( 
    <p className="text-lg text-sky-700 bg-slate-100 tracking-wide border-b border-sky-600 p-4 mb-6 rounded-tl-md rounded-tr-md">
      { text }
    </p>
  )
}