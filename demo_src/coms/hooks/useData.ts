import { ref, Ref } from 'vue';

type DataType = 'colors' | 'spacings' | 'typo';

type Result<T> = {
  failed: Ref<boolean>;
  result: Ref<T | null>;
};

function useData<T>(src: DataType): Result<T> {
  const failed = ref(false);
  const result: Ref<T | null> = ref(null);

  fetch(`data/${src}.json`, { method: 'get', mode: 'no-cors' })
    .then((response) => response.json())
    .then((data) => {
      result.value = data as T;
    })
    .catch(() => {
      failed.value = true;
    });

  return {
    result,
    failed,
  };
}

export default useData;
