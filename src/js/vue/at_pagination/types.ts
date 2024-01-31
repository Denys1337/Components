import { ChevronLeftIcon, ChevronsLeftIcon } from 'vue-tabler-icons';
export interface DefaultItemPerPageOption {
  value: number;
  text: number;
}

export interface AtPaginationProps {
  startingPage: number;
  totalItems: number;
  itemsPerPage: number;
  selectedRowsCount?: number;
  itemsPerPageOptions: Array<DefaultItemPerPageOption>;
  showPrevNextButtons: boolean;
  showFirstLastButtons: boolean;
  parentBackground: string;
  isLoading: boolean;
  currentPage: number;
}

export const paginationIconsMap = (isRtl: boolean) => {
  if (isRtl) {
    return {
      previousPage: { icon: ChevronLeftIcon, transform: 'rotate(180)' },
      firstPage: { icon: ChevronsLeftIcon, transform: 'rotate(180)' },
      nextPage: { icon: ChevronLeftIcon },
      lastPage: { icon: ChevronsLeftIcon },
    };
  }
  return {
    previousPage: { icon: ChevronLeftIcon },
    firstPage: { icon: ChevronsLeftIcon },
    nextPage: { icon: ChevronLeftIcon, transform: 'rotate(180)' },
    lastPage: { icon: ChevronsLeftIcon, transform: 'rotate(180)' },
  };
};

export const DEFAULT_ITEMS_PER_PAGE_OPTIONS = [
  { value: 25, text: 25 },
  { value: 50, text: 50 },
  { value: 75, text: 75 },
  { value: 100, text: 100 },
];

export const DEFAULT_ITEMS_PER_PAGE = 25;
