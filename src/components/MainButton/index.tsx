type Props = {
  text: string
}

export function MainButton ({text}: Props) {
  return (
    <button className="bg-blue-600 text-white text-lg px-4 py-2 rounded-md hover:bg-blue-700">
      { text }
    </button>
  )
}