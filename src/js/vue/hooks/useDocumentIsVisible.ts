import { ref, onMounted, onUnmounted } from 'vue';

type DocumentVisibilityState = 'visible' | 'hidden' | 'prerender';
const VISIBLE: DocumentVisibilityState = 'visible';

export default function useDocumentIsVisible() {
  const documentVisible = ref(document.visibilityState === VISIBLE);

  const onChange = () => (documentVisible.value = document.visibilityState === VISIBLE);

  onMounted(() => document.addEventListener('visibilitychange', onChange));
  onUnmounted(() => document.removeEventListener('visibilitychange', onChange));

  return documentVisible;
}
