/* eslint-disable @typescript-eslint/ban-types */
import { GeneralMedicineIT } from "../../types";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useFilterPage } from "../../hooks/useFilterPage";

type Props = {
  data: GeneralMedicineIT[];
  setData: Function;
};

export function Pagination({ data, setData }: Props) {
  const { actualPage, setActualPage, allPages, items } = useFilterPage(data, setData)

  return (
    <div className="flex justify-between items-center text-gray-600 mt-6">
      <div>
        <p>
          Página <span className="text-bold">{ actualPage.end }</span> de{" "}
          <span className="text-bold">{allPages}</span>
        </p>
      </div>

      <div className="flex items-center w-auto h-[40px] border border-slate-300 rounded-md overflow-hidden">
        <button 
          type='button'
          className="text-slate-300 text-3xl border-r border-slate-300 py-4"
          onClick={() => {
            actualPage.end === 1 ? setActualPage({
              start: 0,
              end: actualPage.end
            }) : setActualPage({
              start: actualPage.start - 1,
              end: actualPage.end - 1
            })
          }}
        >
          <FaCaretLeft />
        </button>
        <div>
          {items.map((item) => (
            <button 
              key={item}
              type="button"
              className={`py-4 px-4 border-r border-slate-300 hover:bg-slate-200 cursor-pointer ${item === actualPage.end && 'bg-slate-200'}`}
              onClick={() => setActualPage({
                start: item - 1,
                end: item
              })}
            >
              {item}
            </button>

          ))}
        </div>
        <button 
          type='button'
          className="text-slate-300 text-3xl"
          onClick={() => {
            actualPage.end === allPages ? setActualPage(actualPage) : setActualPage({
              start: actualPage.start + 1,
              end: actualPage.end + 1
            })
          }}
        >
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
}
