import * as ExcelJS from 'exceljs';
import { ExcelSheetOptions } from './interfaces/excel-sheet-option.interface';

// 엑셀 버퍼 생성 함수
export async function createExcelBuffer(
  options: ExcelSheetOptions,
): Promise<Buffer> {
  const { sheetName = 'Sheet1', columns, data } = options;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns;

  data.forEach((item) => worksheet.addRow(item));

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}
