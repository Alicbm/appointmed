import { FaRegCircleCheck } from "react-icons/fa6";

type Props = {
  error: boolean;
}

export function ModalSentData ({ error }: Props) {
  return (
    <div className={`${error ? 'bg-red-50 border-2 border-red-500' : 'bg-green-50 border-2 border-green-500'} flex justify-center items-center gap-2 h-[70px] rounded-md px-6 py-2 sm:h-[50px]`}>
      <p className={`${error ? 'text-red-500' : 'text-green-500'} text-xl text-center`}>
        {
          error
          ? 'Ocurrió un error, información no enviada'
          : 'Información enviada correctamente'
        }
      </p>
      <span className={`${ error ? 'text-red-500' : 'text-green-500' } text-2xl`}><FaRegCircleCheck /></span>
    </div>
  )
}