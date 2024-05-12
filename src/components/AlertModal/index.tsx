import { ReactNode } from "react"

type Props = {
  title: string;
  text: string;
  children: ReactNode;
}

export function AlertModal ({ title, text, children }: Props) {
  return (
    <div className="fixed top-4 inset-x-0 w-[90%] bg-slate-50 border border-slate-200 rounded-lg p-2 mx-auto sm:w-[450px]">
      <div className="rounded-lg border border-slate-200 px-6 py-8">
        <h2 className="text-2xl text-center text-gray-700 font-bold mb-4 sm:text-3xl">{ title }</h2>
          <p className="text-lg text-center text-gray-500 mb-4 sm:text-xl">
            {text}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            { children }
          </div>
      </div>
    </div>
  )
}