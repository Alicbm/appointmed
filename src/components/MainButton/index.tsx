type Props = {
  text: string;
  className?: string;
}

export function MainButton ({ text, className }: Props) {
  return (
    <button 
      className={`bg-blue-700 text-white text-lg px-4 py-2 rounded-md hover:bg-blue-800 ${className}`}
    >
      { text }
    </button>
  )
}