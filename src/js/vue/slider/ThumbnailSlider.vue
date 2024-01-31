<template>
  <div class="ThumbnailSlider">
    <h3 class="caption font-body-default" v-if="currentPicture.caption">
      {{ currentPicture.caption }}
    </h3>
    <Transition :name="'float-' + animationDirection">
      <img
        :src="currentPicture.thumbSrc || currentPicture.src"
        :alt="currentPicture.alt || currentPicture.caption"
        :key="sliderId + currentIndex"
      />
    </Transition>
    <nav @keypress.stop @click.stop class="navigation">
      <AtButton
        visual="text"
        size="s"
        @click.stop="stopAutoplay() && previousImage()"
        class="navigation-button previous"
        :aria-label="$t('image_slider.previous_image')"
      >
        <Component
          :is="isRtl ? ChevronRightIcon : ChevronLeftIcon"
          size="30"
          v-if="enableNavigation"
        />
      </AtButton>
      <span class="title font-body-default">
        {{ currentPicture?.title }}
      </span>
      <AtButton
        visual="text"
        size="s"
        @click.stop="stopAutoplay() && nextImage()"
        class="navigation-button next"
        :aria-label="$t('image_slider.next_image')"
      >
        <Component
          :is="isRtl ? ChevronLeftIcon : ChevronRightIcon"
          size="30"
          v-if="enableNavigation"
        />
      </AtButton>
    </nav>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onUnmounted, PropType, toRefs, watch } from 'vue';

  import { ChevronLeftIcon, ChevronRightIcon } from 'vue-tabler-icons';

  import useInterval from '../hooks/useInterval';
  import { isRTL } from '../utils/styling';
  import AtButton from './../at_button/AtButton.vue';
  import { SliderPic } from './interfaces';
  import usePictureGallery from './usePictureGallery';
  export default defineComponent({
    name: 'ThumbnailSlider',
    components: { AtButton, ChevronLeftIcon, ChevronRightIcon },
    props: {
      pictures: {
        type: Array as PropType<SliderPic[]>,
        required: false,
        default: () => [],
      },
      autoplay: {
        type: Number,
        required: false,
      },
    },
    emits: ['update:model-value'],
    setup(props, { emit }) {
      const isRtl = isRTL();
      const enableNavigation = computed(() => props.pictures.length > 1);
      const { pictures } = toRefs(props);
      const gallery = usePictureGallery({
        arr: pictures,
        onIndexUpdate: (newIndex: number | undefined) => {
          emit('update:model-value', newIndex);
        },
      });
      const buttonSize = 30;
      const { interval, clear } = useInterval();
      watch(
        () => props.autoplay,
        () => {
          if (props.autoplay) {
            clear();
            interval(() => {
              gallery.nextImage();
            }, props.autoplay);
          }
        },
        { immediate: true }
      );
      const stopAutoplay = () => {
        clear();
        return true;
      };
      onUnmounted(() => {
        stopAutoplay();
      });
      return {
        ...gallery,
        stopAutoplay,
        isRtl,
        enableNavigation,
        ChevronLeftIcon,
        ChevronRightIcon,
        buttonSize,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import './float-animation.scss';
  .ThumbnailSlider {
    --float-leave-to: -100%;
    --float-enter-from: 100%;
    --float-active: 0;
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 100%;

    img {
      position: absolute;
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
    .navigation,
    .caption {
      cursor: default;
      --inline-space: 1rem;
      --block-space: 1rem;
      position: absolute;
      display: flex;
      width: calc(100% - var(--inline-space));
      padding-inline: 1rem;
      padding-block: 0.5rem;
      margin-inline: calc(var(--inline-space) / 2);
      margin-block: calc(var(--block-space) / 2);
      box-sizing: border-box;
      justify-content: space-between;
      z-index: 1;
      border-radius: 5px;
      .title {
        display: flex;
        align-items: center;
      }
    }
    .navigation {
      bottom: 0;
      background-color: var(--gray-100);
    }
    .caption {
      top: 0;
      opacity: 0.7;
      background-color: var(--gray-300);
    }
  }
</style>
