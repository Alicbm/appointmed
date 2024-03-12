/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useState } from "react";
import { BaseIT } from "../types";

export const useFilterPage = (data: BaseIT[] , setData: Function) => {
  const [actualPage, setActualPage] = useState({
    start: 0,
    end: 1
  })

  const items: number[] = [];
  const allPages = Math.ceil(data?.length / 10);

  for (let i = 1; i <= allPages; i++) {
    items.push(i);
  }    

  useEffect(() => { 
    const filterData = () => {
      const start = actualPage.start * 10;
      const end = actualPage.end * 10;

      const newData = data?.slice(start, end)
      setData(newData)
    }

    filterData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualPage])

  return { actualPage, setActualPage, allPages, items }
}