<template>
  <section class="PictureSlider">
    <div
      class="trigger-container"
      :class="{ pointer: openOnClick }"
      tabindex="0"
      @keypress.enter="openOnClick && openPopup()"
      @click="openOnClick && openPopup()"
    >
      <slot>
        <ThumbnailSlider v-model="currentIndex" :autoplay="autoplay" :pictures="pictures" />
      </slot>
    </div>
    <PicturePopup
      v-if="showPopup"
      :pictures="pictures"
      :start-index="currentIndex"
      @close="closePopup"
    />
  </section>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';

  import PicturePopup from './PicturePopup.vue';
  import ThumbnailSlider from './ThumbnailSlider.vue';
  import { SliderPic } from './interfaces';

  export default defineComponent({
    components: { ThumbnailSlider, PicturePopup },
    props: {
      pictures: {
        type: Array as PropType<SliderPic[]>,
        required: false,
        default: () => [],
      },
      openOnClick: {
        type: Boolean,
        required: false,
        default: true,
      },
      autoplay: {
        type: Number,
        required: false,
        default: 5000,
      },
    },
    setup() {
      const currentIndex = ref<number>();
      const showPopup = ref(false);
      const openPopup = () => {
        showPopup.value = true;
      };
      const closePopup = () => {
        showPopup.value = false;
      };

      return {
        currentIndex,
        showPopup,
        openPopup,
        closePopup,
      };
    },
  });
</script>

<style lang="scss">
  .PictureSlider {
    &,
    .trigger-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
