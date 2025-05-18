import { ExcelSheetColumn } from './excel-sheet-column.interface';

// 엑셀 시트 옵션 인터페이스
export interface ExcelSheetOptions {
  sheetName?: string;
  columns: ExcelSheetColumn[];
  data: Record<string, any>[];
  fileName?: string;
}
