import { ReactNode } from "react"

type Props = {
  title: string;
  text: string;
  children: ReactNode;
}

export function AlertModal ({ title, text, children }: Props) {
  return (
    <div className="fixed top-4 inset-x-0 w-[450px] bg-slate-50 border border-slate-200 rounded-lg p-2  mx-auto">
      <div className="rounded-lg border border-slate-200 px-6 py-8">
      <h2 className="text-3xl text-center text-gray-700 font-bold mb-4">{ title }</h2>
        <p className="text-xl text-center text-gray-500 mb-4">
          {text}
        </p>

        <div className="flex gap-4">
          { children }
        </div>
      </div>
    </div>
  )
}