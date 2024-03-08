type Props = {
  text: string;
}

export function SubtitleInputs ({ text } : Props) {
  return ( 
    <p className="text-lg text-blue-600 bg-blue-50 tracking-wide border-b border-blue-500 p-4 mb-6 rounded-tl-md rounded-tr-md">
      { text }
    </p>
  )
}