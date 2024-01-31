import { computed, Ref } from 'vue';

function useElementComputedStyleString(elem: Ref<HTMLElement | null | undefined>, keys: string[]) {
  return computed(() => {
    if (!elem.value) {
      return '';
    }
    const style = getComputedStyle(elem.value);
    // @ts-ignore
    return keys.map((key) => `${key}: <strong>${style[key]}</strong>`).join(', ');
  });
}

export default useElementComputedStyleString;
