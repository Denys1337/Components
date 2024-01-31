//same as stringIncludesQueryInsensitive in js-utils but stores the query value for multiple use

import { computed, Ref } from 'vue';

const useStringIncludesQueryInsensitive = (query: Ref<string>) => {
  const lowerCaseQuery = computed(() => query.value.toLowerCase());
  return (text: string) => text.toLowerCase().includes(lowerCaseQuery.value);
};

export default useStringIncludesQueryInsensitive;
