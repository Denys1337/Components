import { Ref, ref, UnwrapRef, watch } from 'vue';

let filterText: Ref<string>;

interface Group {
  title: string;
  items: Record<string, any>[];
}

const useFilter = () => {
  if (!filterText) {
    filterText = ref('');
  }

  const generateFilterByKey = <T>(key: string) => {
    return (items: T[]): T[] => {
      const text = filterText.value.trim().toLowerCase();
      if (text === '') {
        return items;
      }
      // @ts-ignore
      return items.filter((item) => item[key].includes(filterText.value));
    };
  };

  /**
   *
   * @param items for ClassText key 'className'. for GroupItem key 'key'
   * @param keyToFilterBy
   * @returns
   */
  const registerTargetToFilter = <T>(items: T[], keyToFilterBy: string) => {
    const filteredItems = ref<T[]>([]);
    const filterFunc = generateFilterByKey<T>(keyToFilterBy);
    watch(
      () => filterText.value,
      () => {
        filteredItems.value = filterFunc(items) as UnwrapRef<T[]>;
      },
      { immediate: true, deep: true }
    );

    return filteredItems;
  };

  const registerGroupsToFilter = (groups: Ref<Group[]>, keyToFilterBy = 'key') => {
    const filteredGroups = ref<Group[]>([]);

    const filterFunc = generateFilterByKey<Record<string, any>>(keyToFilterBy);
    watch(
      () => [filterText.value, groups.value],
      () => {
        filteredGroups.value = groups.value.map((group) => {
          return {
            ...group,
            items: filterFunc(group.items),
          };
        });
      },
      { immediate: true, deep: true }
    );

    return filteredGroups;
  };

  return {
    filterText,
    registerTargetToFilter,
    registerGroupsToFilter,
  };
};

export default useFilter;
