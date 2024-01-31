<template>
  <div>
    <div class="mt" :class="{ pills: translationsKeys.length }">
      <span class="font-body-small text-gray-600" v-if="!translationsKeys.length">
        {{ $t('at_translations.no_translation') }}
      </span>
      <template v-else>
        <div
          class="mt-pill-pri pill"
          v-for="key in translationsKeys"
          :key="key"
          @click="openTranslationPopup(key as Locales)"
        >
          {{ key }}
          <span class="delete" @click.stop="emit('remove-translation', key)">
            <PlusIcon size="12" />
          </span>
        </div>
      </template>
    </div>
    <AtButton @click="openTranslationPopup()" :visual="ButtonVisual.text">
      <PlusIcon size="16" /> {{ $t('at_translations.add_translation') }}
    </AtButton>
    <AtPopup
      :title-text="$t('at_translations.add_translation')"
      :cancel-text="$t('general.cancel')"
      :confirm-text="$t('general.save')"
      :confirm-disabled="isSaveDisabled"
      :show="show"
      disable-click-away
      show-divider-line
      show-close-icon
      show-confirmation-buttons
      @close="show = false"
      @ok="saveTranslations"
    >
      <h4 class="font-body-small-b text-gray-1000 block-start-04 block-end-02">
        {{ $t('at_translations.original_text') }}
      </h4>
      <div class="font-body-small text-gray-900 block-end-06" :dir="originalDirection">
        <template v-for="(field, index) in translationFields" :key="'label_' + field.label">
          <span class="capitalize-first">{{ field.label }}: "{{ field.originalValue }}"</span>
          <br v-if="index !== translationFields.length - 1" />
        </template>
      </div>
      <div class="d-flex block-end-06 gap-04">
        <AtSelect
          lass="flex-1"
          :options="options"
          :stored-options="options"
          v-model="currentLocaleEdit"
          :show-clear-button="false"
          :enable-lazy-render="false"
        />
        <AtButton
          :mood="ButtonMood.danger"
          :size="ButtonSize.m"
          :visual="ButtonVisual.secondary"
          @click="delete localTranslations[currentLocaleEdit]"
          v-if="localTranslations[currentLocaleEdit]"
        >
          {{ $t('at_translations.delete') }}
        </AtButton>
      </div>

      <div class="block-end-05" v-for="field in translationFields" :key="field.name">
        <label class="label font-body-small-b block-end-01">{{ field.label }}</label>
        <Component
          :is="field.component"
          v-bind="field.props"
          :model-value="getCurrentTranslation[field.name] || ''"
          @update:modelValue="setCurrentTranslation(field.name, $event)"
        />
      </div>
    </AtPopup>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType, ref, watch } from 'vue';

  import { PlusIcon } from 'vue-tabler-icons';

  import { deepClone } from '@agritask/js-utils/libs/object_utils';

  import AtButton from '../at_button/AtButton.vue';
  import { ButtonVisual, ButtonMood, ButtonSize } from '../at_button/types';
  import AtPopup from '../at_popup/AtPopup.vue';
  import AtSelect from '../at_select/AtSelect.vue';
  import languageNameMap from './languageNameMap';
  import { Locales, TranslationField, TranslationObject } from './types';
  const props = defineProps({
    translations: { type: Object as PropType<TranslationObject>, required: true },
    translationFields: { type: Array as PropType<TranslationField[]>, required: true },
    openLocale: { type: String as PropType<Locales>, required: false },
    locale: { type: String as PropType<Locales>, required: true },
    userLocales: { type: Array as PropType<Locales[]>, required: true },
    isSaveDisabled: { type: Boolean, required: false },
  });

  const emit = defineEmits(['update:show', 'update:translations', 'remove-translation']);

  const defaultLocale = computed<Locales>(() => {
    if (props.translations?.[props.locale]) {
      // The current local
      return props.locale;
    } else if (props.translations['en']) {
      // English
      return 'en';
    } else {
      // any
      return Object.keys(props.translations)[0] as Locales;
    }
  });
  const show = ref(false);

  const options = computed(() =>
    props.userLocales
      .filter((code) => code !== props.locale)
      .map((code) => ({ value: code, text: languageNameMap[code].name }))
  );

  const localTranslations = ref(deepClone(props.translations));
  watch(
    () => [props.translations, show.value],
    () => (localTranslations.value = deepClone(props.translations)),
    { deep: true }
  );

  const translationsKeys = computed(() =>
    Object.keys(props.translations).filter((key) => key !== props.locale)
  );

  const currentLocaleEdit = ref<Locales>(options.value[0].value);
  const originalDirection = computed(
    () => defaultLocale.value && languageNameMap[defaultLocale.value].dir
  );

  const getCurrentTranslation = computed<Record<string, string>>(
    () => localTranslations.value[currentLocaleEdit.value] || {}
  );

  const setCurrentTranslation = (key: string, value: string) => {
    localTranslations.value[currentLocaleEdit.value] = {
      ...localTranslations.value[currentLocaleEdit.value],
      [key]: value,
    };
  };

  const openTranslationPopup = (locale?: Locales) => {
    currentLocaleEdit.value = locale || currentLocaleEdit.value || props.userLocales[0];
    show.value = true;
  };

  const saveTranslations = () => {
    emit('update:translations', localTranslations.value);
    show.value = false;
  };
</script>

<style lang="scss">
  .pills {
    padding-block-start: var(--spacing-01);
    .pill {
      cursor: pointer;
      text-transform: capitalize;
      display: inline-block;
      position: relative;
      .delete {
        transition: opacity 200ms ease-in-out;
        box-sizing: content-box;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(45deg);
        width: 18px;
        height: 18px;
        border-radius: 50%;
        color: var(--gray-100);
        background-color: var(--gray-700);
        border: 2px solid var(--gray-100);
        position: absolute;
        inset-block-start: -7px;
        inset-inline-end: -7px;
      }
      &:hover {
        .delete {
          opacity: 1;
        }
      }
    }
    .pill:first-child {
      margin-inline-start: 0;
    }
  }
</style>
