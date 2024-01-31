import { Ref, ref } from 'vue';
interface useIndexNavigationParams {
  arr: Ref<unknown[]>;
  startingIndex?: number;
  onIndexUpdate?: (newIndex?: number) => void;
}
export default function useIndexNavigation(params: useIndexNavigationParams) {
  const { arr, startingIndex, onIndexUpdate } = params;
  const currentIndex = ref(startingIndex ?? 0);

  const getValidIndex = (index: number) => {
    if (arr.value.length === 1) return 0;
    if (index < 0) return arr.value.length + index;
    return index % arr.value.length;
  };
  const updateIndex = (decrement?: boolean) => {
    currentIndex.value = getValidIndex(currentIndex.value + (decrement ? -1 : 1));
    onIndexUpdate && onIndexUpdate(currentIndex.value);
  };
  return { updateIndex, currentIndex };
}
