import { FieldValues, UseFormRegister, UseFormReturn } from "react-hook-form";
import { classNames } from "../../utils";
import { useState } from "react";

type Props = {
  label: string;
  type?: string;
  fieldName: string;
  rules?: Parameters<UseFormRegister<FieldValues>>[1];
  allForm: UseFormReturn<FieldValues>;
};

export function Input({
  label,
  type,
  fieldName,
  rules,
  allForm
}: Props) {
  const [text, setText] = useState("");

  const { register, setValue, formState: { errors } } = allForm;

  const verifyError = errors && errors[fieldName]
  
  return (
    <div className={classNames([ 
      "relative flex items-end w-full h-[55px] rounded-md",
      text.length > 0 ? 'bg-[#E8F0FE]' : 'bg-gray-100'
     ])}>
      <input
        id={label}
        type={type || "text"}
        className={classNames([
          verifyError
            ? "border-2 border-red-400"
            : "border border-gray-200 focus:border-2 focus:border-sky-700",
          "w-full h-full text-gray-800 bg-transparent peer outline-none px-4 pt-6 rounded-md",
        ])}
        {...register(fieldName, rules)}
        onChange={(e) => {
          setText(e.target.value);
          setValue && setValue(fieldName, e.target.value);
        }}
      />
      <label
        htmlFor={label}
        className={classNames([
          text.length > 0
            ? "absolute top-1 left-3 text-sky-700"
            : "absolute top-[16px] left-4 text-gray-500 transition-all peer-focus:top-1 peer-focus:left-3 peer-focus:text-sky-700",
          (verifyError && text.length === 0) ? "text-red-600" : "text-gray-500",
        ])}
      >
        {label}
      </label>
      {verifyError && (
        <span
          className="absolute -bottom-[17px] left-2 text-[12px] text-red-600"
        >
          { verifyError?.type === 'required' && 'Este campo es requerido' }
          { verifyError?.type === 'pattern' && 'El formato del email es incorrecto' }
          { verifyError?.type === 'minLength' && `El campo debe tener mínimo ${rules?.minLength} caracteres`}
          { verifyError?.type === 'maxLength' && `El campo debe tener máximo ${rules?.maxLength} caracteres`}
        </span>
      )}
    </div>
  );
}
