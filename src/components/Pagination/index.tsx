import { useState } from "react";
import { GeneralMedicineIT } from "../../types";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

type Props = {
  data: GeneralMedicineIT[];
};

export function Pagination({ data }: Props) {
  const [actualPage, setActualPage] = useState(1)

  const items: number[] = [];
  const allPages = Math.ceil(data.length / 10);

  for (let i = 1; i <= allPages; i++) {
    items.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-6">
      <div>
        <p>
          Página <span className="text-bold">{ actualPage }</span> de{" "}
          <span className="text-bold">{allPages}</span>
        </p>
      </div>

      <div className="flex items-center w-auto h-[50px] border border-gray-400 rounded-md overflow-hidden">
        <button 
          type='button'
          className="text-gray-400 text-4xl border-r border-gray-300 py-4"
          onClick={() => {
            actualPage === 1 ? setActualPage(actualPage) : setActualPage(actualPage - 1)
          }}
        >
          <FaCaretLeft />
        </button>
        <div>
          {items.map((item) => (
            <button 
              type="button"
              className={`py-4 px-4 border-r border-gray-300 hover:bg-gray-300 cursor-pointer ${item === actualPage && 'bg-gray-300'}`}
              onClick={() => setActualPage(item)}
            >
              {item}
            </button>

          ))}
        </div>
        <button 
          type='button'
          className="text-gray-400 text-4xl"
          onClick={() => {
            actualPage === allPages ? setActualPage(actualPage) : setActualPage(actualPage + 1)
          }}
        >
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
}
