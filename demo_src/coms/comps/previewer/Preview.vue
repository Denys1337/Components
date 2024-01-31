<template>
  <section
    class="Preview p-fixed bottom-0 pad-02 elevation-level-03"
    :class="{ closed: !isOpened }"
  >
    <button
      @click="toggleOpen(false)"
      class="closeButton p-absolute d-flex jc-space-around right-0 top-0"
      v-if="templateText"
    >
      <ArrowDownIcon v-if="isOpened" />
      <ShoppingCartIcon v-else />
    </button>
    <div class="preview-container d-flex flex-column jc-space-between" v-if="isOpened">
      <div class="List d-flex">
        <ClassList />
        <CSSPropertiesList />
      </div>
      <AtButton
        class="button-delete-all"
        :size="ButtonSize.s"
        :mood="ButtonMood.danger"
        @click="removeAllCss()"
      >
        Delete All</AtButton
      >
      <textarea
        :value="templateText"
        :style="{ minHeight: templateTextLineCount + 1 + 'em' }"
        readonly
      ></textarea>
      <div class="List d-flex jc-space-between">
        <div v-if="templateText" class="live-preview preview-part-container elevation-level-03">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="previewHTML"></div>
        </div>
        <AtButton class="button--copy capitalize as-center" @click="copyTemplateText"
          >copy</AtButton
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { watch, computed, defineComponent, ref } from 'vue';

  import { ArrowDownIcon, ShoppingCartIcon } from 'vue-tabler-icons';

  import { copyToClipboard } from '@agritask/js-utils/libs/clipboard';

  import AtButton from '../../../../src/js/vue/at_button/AtButton.vue';
  import { ButtonMood, ButtonSize, ButtonVisual } from '../../../../src/js/vue/at_button/types';
  import useContentSanitizer from '../../../../src/js/vue/hooks/useContentSanitizer';
  import useClipboardStore from '../../hooks/useClipboardStore';
  import CSSPropertiesList from './parts/CSSPropertiesList.vue';
  import ClassList from './parts/ClassList.vue';

  import './preview.scss';
  import './parts/list.scss';

  export default defineComponent({
    name: 'PreviewShowcase',
    components: {
      CSSPropertiesList,
      ClassList,
      AtButton,
      ShoppingCartIcon,
      ArrowDownIcon,
    },
    setup() {
      const { html, css, previewHTML } = useClipboardStore();

      const { removeAllCss } = useClipboardStore();

      const isOpened = ref(false);

      const templateText = computed(() => {
        if (css.value && html.value) {
          return css.value + '\n\n' + html.value;
        } else if (css.value) {
          return css.value;
        } else if (html.value) {
          return html.value;
        }
        return '';
      });
      watch(templateText, (newText: string, prevText: string) => {
        if ((!isOpened.value && prevText === '') || (isOpened.value && newText === '')) {
          toggleOpen(true);
        }
      });
      function toggleOpen(skipCheck: boolean) {
        if (templateText.value.length > 0 || skipCheck) isOpened.value = !isOpened.value;
      }

      const templateTextLineCount = computed(() => templateText.value.split('\n').length);

      const copyTemplateText = () => copyToClipboard(templateText.value);

      const saniziedPreviewHTML = useContentSanitizer(previewHTML.value);

      return {
        templateText,
        templateTextLineCount,
        isOpened,
        toggleOpen,
        previewHTML,
        saniziedPreviewHTML,
        copyTemplateText,
        ButtonSize,
        ButtonVisual,
        removeAllCss,
        ButtonMood,
      };
    },
  });
</script>
