<template>
  <Teleport to="body">
    <div
      autofocus
      @keydown="onKeypress"
      ref="popupRef"
      tabindex="0"
      @click="close"
      v-bind="$attrs"
      class="PicturesPopup"
    >
      <Transition :name="'float-' + animationDirection">
        <img
          @click.stop
          :src="currentPicture.src || currentPicture.thumbSrc"
          :alt="currentPicture.alt || currentPicture.caption"
          :key="sliderId + currentIndex"
        />
      </Transition>
      <AtButton
        @click.stop="previousImage"
        visual="text"
        size="l"
        class="navigation-button previous"
        :aria-label="$t('image_slider.previous_image')"
        v-if="enableNavigation"
      >
        <Component size="60" :is="isRtl ? ChevronRightIcon : ChevronLeftIcon" />
      </AtButton>
      <AtButton
        visual="text"
        size="l"
        @click.stop="nextImage"
        class="navigation-button next"
        :aria-label="$t('image_slider.next_image')"
        v-if="enableNavigation"
      >
        <Component size="60" :is="isRtl ? ChevronLeftIcon : ChevronRightIcon" />
      </AtButton>
      <h3 class="title" v-if="currentPicture.title">{{ currentPicture.title }}</h3>
    </div>
  </Teleport>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, onMounted, PropType, ref, toRefs } from 'vue';

  import { ChevronLeftIcon, ChevronRightIcon } from 'vue-tabler-icons';

  import AtButton from './../at_button/AtButton.vue';
  import { SliderPic } from './interfaces';
  import usePictureGallery from './usePictureGallery';

  export default defineComponent({
    components: { AtButton, ChevronLeftIcon, ChevronRightIcon },
    props: {
      pictures: {
        type: Array as PropType<SliderPic[]>,
        required: false,
        default: () => [],
      },
      showNavigation: {
        type: Boolean,
        required: false,
        default: true,
      },
      startIndex: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    emits: { change: null, close: null },
    setup(props, { emit }) {
      const close = () => emit('close');
      const { pictures } = toRefs(props);
      const gallery = usePictureGallery({ arr: pictures, startingIndex: props.startIndex });
      const popupRef = ref<HTMLElement | null>();
      const onKeypress = (event: KeyboardEvent) => {
        switch (event.code) {
          case 'ArrowLeft':
            gallery.isRtl ? gallery.nextImage() : gallery.previousImage();
            break;
          case 'ArrowRight':
            gallery.isRtl ? gallery.previousImage() : gallery.nextImage();
            break;
          case 'Escape':
            close();
            break;
        }
      };
      const enableNavigation = computed(() => props.showNavigation && props.pictures.length > 1);

      //Make the autofocus work
      onBeforeMount(() => {
        if (document.activeElement) {
          (document.activeElement as HTMLElement)?.blur();
        }
      });
      onMounted(() => {
        popupRef.value?.focus();
      });

      return {
        ...gallery,
        popupRef,
        ChevronLeftIcon,
        ChevronRightIcon,
        enableNavigation,
        close,
        onKeypress,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import 'float-animation.scss';
  .PicturesPopup {
    --float-leave-to: -200vw;
    --float-enter-from: 200vw;
    --float-active: -50%;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    color: var(--white);
    z-index: var(--popup-z);
    display: grid;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow-x: visible;
    img {
      position: absolute;
      transform: translateX(-50%);
      inset-inline-start: 50%;
      max-height: 80vh;
    }

    &::before {
      content: '';
      z-index: -1;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .navigation-button {
      position: absolute;
      justify-content: space-between;
      cursor: pointer;
      z-index: 2;
      z-index: 1;
      border-radius: 5px;

      &.next {
        inset-inline-end: 2rem;
      }
      &.previous {
        inset-inline-start: 2rem;
      }
    }

    .title {
      z-index: 1;
      position: absolute;
      inset-inline-end: 50%;
      transform: translateX(50%);
      inset-block-end: 3rem;
      color: var(--white);
    }
  }
</style>
