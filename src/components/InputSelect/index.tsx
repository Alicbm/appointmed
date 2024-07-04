import { useState } from "react";
import { FieldValues, UseFormRegister, UseFormReturn } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { classNames } from "../../utils";

type Props = {
  label: string;
  type?: string;
  listData: string[];
  fieldName: string;
  value?: string;
  rules?: Parameters<UseFormRegister<FieldValues>>[1];
  allForm: UseFormReturn<FieldValues>;
  disabled?: boolean;
  editValue?: boolean;
};

export function InputSelect({
  label,
  type,
  listData,
  fieldName,
  rules,
  allForm,
  value,
  disabled,
  editValue
}: Props) {
  const [showListData, setShowListData] = useState(false);
  const [text, setText] = useState(value || '');
  const [filteredData, setFilteredData] = useState("");

  const newData = listData?.filter((item) =>
    filteredData?.length > 0
      ? item?.toLowerCase()?.includes(filteredData?.toLowerCase())
      : listData
  );

  const {
    register,
    setValue,
    formState: { errors },
  } = allForm;

  const verifyError = errors && errors[fieldName];

  return (
    <div className="relative flex items-end w-full h-[55px] bg-gray-100 rounded-md">
      <input
        id={label}
        type={type || "text"}
        value={text}
        disabled={disabled}
        className={classNames([
          verifyError
            ? "border-2 border-red-400"
            : "border border-gray-200 focus:border-2 focus:border-sky-700",
            editValue ? 'border-2 border-green-500' : '',
          "w-full h-full text-gray-800 bg-transparent peer outline-none px-4 pt-6 rounded-md",
        ])}
        {...register(fieldName, rules)}
      />
      <label
        className={classNames([
          text.length > 0
            ? "absolute top-1 left-3 text-sky-700"
            : "absolute top-[16px] left-4 text-gray-500 transition-all peer-focus:top-1 peer-focus:left-3 peer-focus:text-sky-700",
          verifyError && text.length === 0 ? "text-red-600" : "text-gray-500",
        ])}
      >
        {label}
      </label>

      {verifyError && (
        <span className="absolute -bottom-[17px] left-2 text-[12px] text-red-600">
          {verifyError?.type === "required" && "Este campo es requerido"}
        </span>
      )}

      {showListData && (
        <div className="absolute top-[60px] w-full bg-gray-100 border border-gray-200 rounded-md z-10">
          <div className="p-4">
            <input
              type="text"
              placeholder="Busca tu EPS..."
              className="w-full h-[40px] px-2 rounded-sm outline-none"
              onChange={(e) => setFilteredData(e.target.value)}
              disabled={disabled}
            />
          </div>
          <ul className="max-h-[200px] px-4 pb-4 overflow-y-scroll">
            {newData?.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setText(item);
                  setShowListData(false);
                  setValue && setValue(fieldName, item);
                }}
                className="p-2 rpunded-sm cursor-pointer hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <span
        className={classNames([
          disabled ? 'hidden' : '',
          "absolute right-4 top-[15px] text-xl text-sky-700 cursor-pointer p-1 rounded-sm hover:bg-sky-100"
        ])}
        onClick={() => setShowListData(!showListData)}
      >
        <IoIosArrowDown />
      </span>
    </div>
  );
}
