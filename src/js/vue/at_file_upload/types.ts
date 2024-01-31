import { AtToastType } from '../at_toast/types';

export enum FileTypes {
  JPEG_OR_JPG_FILE = 'image/jpeg',
  PNG_FILE = 'image/png',
  SVG_FILE = 'image/svg+xml',
  PDF_FILE = 'application/pdf',
  DOC_FILE = 'application/msword',
  DOCX_FILE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  RTF_TEXT_FILE = 'text/rtf',
  RTF_FILE = 'application/rtf',
}

export const FileTypeExtensionMap: Record<FileTypes, string> = {
  [FileTypes.JPEG_OR_JPG_FILE]: '.jpeg',
  [FileTypes.PNG_FILE]: '.png',
  [FileTypes.SVG_FILE]: '.svg',
  [FileTypes.PDF_FILE]: '.pdf',
  [FileTypes.DOC_FILE]: '.doc',
  [FileTypes.DOCX_FILE]: '.docx',
  [FileTypes.RTF_TEXT_FILE]: '.rtf',
  [FileTypes.RTF_FILE]: '.rtf',
};

export const DEFUALT_SUPPORTED_FILES = [
  FileTypes.JPEG_OR_JPG_FILE,
  FileTypes.PDF_FILE,
  FileTypes.PNG_FILE,
  FileTypes.SVG_FILE,
];
export const ONE_MB_IN_BYTES = 1048576;
export const TOAST_TYPE = AtToastType.Error;
export function validatorFilesTypes(values: FileTypes[]) {
  const filesTypesArr = Object.values(FileTypes);
  return values.every((fileType) => filesTypesArr.includes(fileType));
}
export interface AtFileListDisplayProps {
  filesToDisplay: any[];
  deleteIconSize?: number;
  displayFileName: boolean;
}
export interface AtFileUploadProps {
  filesExtensions: FileTypes[];
  maxFileMbSize?: number;
  maxMultiSelection: number;
  disabled: boolean;
}
export interface FileToDisplay {
  uuid: string;
  src?: string;
  fileName?: string;
}
