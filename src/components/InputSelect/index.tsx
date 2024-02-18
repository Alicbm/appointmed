import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  label: string;
  type?: string;
  listData: string[];
};

export function InputSelect({ label, type, listData }: Props) {
  const [showListData, setShowListData] = useState(false);
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const newData = listData.filter((item) =>
    filteredData.length > 0
      ? item.toLowerCase().includes(filteredData.toLowerCase())
      : listData
  );

  return (
    <div className="relative flex items-end w-full h-[55px] bg-gray-100 rounded-md">
      <input
        id={label}
        type={type || "text"}
        name={label}
        value={text}
        className="w-full h-full bg-transparent peer outline-none px-4 pt-6 rounded-md border border-gray-200 focus:border-2 focus:border-blue-600"
      />
      <label
        htmlFor={label}
        className={`${
          text.length > 0 ? "top-1 left-3 text-blue-600" : ""
        } absolute top-[16px] left-4 text-gray-500 transition-all peer-focus:top-1 peer-focus:left-3 peer-focus:text-blue-600`}
      >
        {label}
      </label>

      {showListData && (
        <div className="absolute top-[60px] w-full bg-gray-100 border border-gray-200 rounded-md z-10">
          <div className="p-4">
            <input
              type="text"
              placeholder="Busca tu EPS..."
              className="w-full h-[40px] px-2 rounded-sm outline-none"
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
        className="absolute right-4 top-[15px] text-xl text-blue-700 cursor-pointer p-1 rounded-sm hover:bg-blue-100"
        onClick={() => setShowListData(!showListData)}
      >
        <IoIosArrowDown />
      </span>
    </div>
  );
}
