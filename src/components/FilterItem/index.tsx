/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MainButton } from "../MainButton";
import { FilterItemType, BaseIT } from "../../types";
import { useFilterPage } from "../../hooks/useFilterPage";

type Props = {
  listData: ListDataType[];
  data: BaseIT[];
  setData: Function;
};

type ListDataType = {
  label: string;
  value: string;
};

export function FilterItem({ listData, data, setData }: Props) {
  const { setActualPage } = useFilterPage(data, setData);

  const [showListData, setShowListData] = useState(false);

  const [inputSelectText, setInputSelectText] = useState("");
  const [inputText, setInputText] = useState("");

  const [filteredData, setFilteredData] = useState("");

  const listFiltered = listData?.filter((item) =>
    filteredData?.length > 0
      ? item?.label?.toLowerCase()?.includes(filteredData.toLowerCase())
      : listData
  );

  const handleSearch = () => {
    setData(
      data.filter((item: BaseIT) => {
        const searchText = inputText.toLowerCase();
        const fieldToSearch = item[inputSelectText as keyof FilterItemType];

        if (String(fieldToSearch).toLowerCase().includes(searchText)) {
          return item;
        } else if (String(fieldToSearch).toLowerCase() === searchText) {
          return item;
        }
      })
    );
  };

  const handleClearFilter = () => {
    setInputSelectText("");
    setInputText("");

    setActualPage({
      start: 0,
      end: 1,
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex items-end w-full h-[45px] bg-slate-100 rounded-md">
          <input
            value={inputSelectText}
            onChange={(e) => setInputSelectText(e.target.value)}
            placeholder="Seleccionar item"
            className="w-full h-full bg-transparent outline-none px-4 rounded-md border border-slate-300 focus:border-2 focus:border-sky-700"
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
                {listFiltered.map((item) => (
                  <li
                    key={item.label}
                    onClick={() => {
                      setInputSelectText(item.value);
                      setShowListData(false);
                    }}
                    className="p-2 rpunded-sm cursor-pointer hover:bg-gray-200"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <span
            className="absolute right-4 top-[10px] text-xl text-sky-700 cursor-pointer p-1 rounded-sm hover:bg-sky-100"
            onClick={() => setShowListData(!showListData)}
          >
            <IoIosArrowDown />
          </span>
        </div>

        <input
          value={inputText}
          placeholder="Buscar..."
          className="w-full h-[45px] bg-slate-100 outline-none px-4 rounded-md border border-slate-300 focus:border-2 focus:border-sky-700"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center gap-2">
        <MainButton
          text="Buscar"
          className="min-w-[150px] w-full bg-sky-700 hover:bg-sky-800"
          onClick={handleSearch}
        />
        <MainButton
          text="Limpiar"
          className="min-w-[150px] w-full bg-black hover:bg-gray-900"
          onClick={handleClearFilter}
        />
      </div>
    </div>
  );
}
