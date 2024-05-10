import * as XLSX from 'xlsx'
import { BaseIT } from '../types';

export const downloadExcelFile = (data: BaseIT[], nameFile: string) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Agregar la hoja de cálculo al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');

  // Guardar el libro de trabajo como un archivo Excel
  XLSX.writeFile(workbook,  `${nameFile}.xlsx`);
}