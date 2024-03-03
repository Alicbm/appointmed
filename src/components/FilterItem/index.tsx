import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MainButton } from "../MainButton";

type Props = {
  listData: string[];
};

export function FilterItem({ listData }: Props) {
  const [showListData, setShowListData] = useState(false);
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const newData = listData.filter((item) =>
    filteredData.length > 0
      ? item.toLowerCase().includes(filteredData.toLowerCase())
      : listData
  );

  return (
    <div className="flex gap-4">
      <div className="relative flex items-end w-full h-[45px] bg-slate-100 rounded-md">
        <input
          value={text}
          placeholder="Seleccionar item"
          className="w-full h-full bg-transparent outline-none px-4 rounded-md border border-slate-300 focus:border-2 focus:border-blue-600"
        />

        {showListData && (
          <div className="absolute top-[60px] w-full bg-slate-100 border border-slate-300 rounded-md z-10 overflow-hidden">
            <div className="p-4">
              <input
                type="text"
                placeholder="Busca tu EPS..."
                className="w-full h-[40px] bg-slate-50 px-2 rounded-md outline-none border border-slate-200"
                onChange={(e) => setFilteredData(e.target.value)}
              />
            </div>
            <ul className="max-h-[200px] px-4 pb-4 overflow-y-scroll">
              {newData.map((item) => (
                <li
                  onClick={() => {
                    setText(item);
                    setShowListData(false);
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
          className="absolute right-4 top-[10px] text-xl text-blue-700 cursor-pointer p-1 rounded-sm hover:bg-blue-100"
          onClick={() => setShowListData(!showListData)}
        >
          <IoIosArrowDown />
        </span>
      </div>

      <input
        placeholder="Buscar..."
        className="w-full h-[45px] bg-slate-100 outline-none px-4 rounded-md border border-slate-300 focus:border-2 focus:border-blue-600"
        onChange={(e) => setText(e.target.value)}
      />

      <MainButton text="Buscar" className="min-w-[150px]" />
    </div>
  );
}
