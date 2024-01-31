type FileIcon = 'IMAGE' | 'EXCEL' | 'ARCHIVE' | 'JSON';

export type FileCellItem = {
  type: FileIcon;
  url: string;
  title: string;
};

type FileIconsMap = Record<FileIcon, string>;

export const FILE_ICONS_MAP: FileIconsMap = {
  IMAGE: 'cards-recent-pictures',
  EXCEL: 'tables-download-xls',
  ARCHIVE: 'tables-archive',
  JSON: 'tables-file',
};

export const DEFAULT_CHAR_LIMITATION = 30;
