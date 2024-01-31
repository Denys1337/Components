import { computed, Ref } from 'vue';

export default function useLabelRequiredClasses(
  required: Ref<boolean>,
  passiveRequired?: Ref<boolean | undefined>
) {
  if (required.value && passiveRequired?.value) {
    console.error(
      'You passed both required and passiveRequired props equal to true, passiveRequired will be ignored'
    );
  }

  const labelClasses = computed(() => ({
    asterisk: required.value || passiveRequired?.value,
    required: required.value,
    'passive-required': !required.value && passiveRequired?.value,
  }));

  return labelClasses;
}
