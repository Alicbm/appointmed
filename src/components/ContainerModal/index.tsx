import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export function ContainerModal({ children }: Props) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-[.8] py-4 z-50">
      { children }
    </div>
  )
}