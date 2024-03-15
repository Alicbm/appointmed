import { MainButton } from "../MainButton";

type Props = {
  text: string;
}

export function NotResults({ text }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-10">
      <p className="text-xl text-gray-500">
        {text}
      </p>
      <MainButton text='Crear nueva solicitud' className="bg-sky-800"/>
    </div>
  );
}
