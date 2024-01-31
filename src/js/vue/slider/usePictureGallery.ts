import { computed, ref, Ref } from 'vue';

import createId from '@agritask/js-utils/libs/createId';

import { isRTL } from '../utils/styling';
import { SliderPic } from './interfaces';
import useIndexNavigation from './useIndexNavigation';
interface usePictureGalleryParams {
  arr: Ref<SliderPic[]>;
  startingIndex?: number;
  onIndexUpdate?: (newIndex?: number) => void;
}
export default function usePictureGallery(params: usePictureGalleryParams) {
  const { arr } = params;
  const isRtl = isRTL();
  const sliderId = createId('image-slider');

  const { currentIndex, updateIndex } = useIndexNavigation(params);
  const animationDirection = ref('-rtl');

  const currentPicture = computed(() => arr.value[currentIndex.value]);

  const nextImage = () => {
    animationDirection.value = isRtl ? 'ltr' : 'rtl';
    updateIndex();
  };
  const previousImage = () => {
    animationDirection.value = isRtl ? 'rtl' : 'ltr';
    updateIndex(true);
  };

  return {
    sliderId,
    isRtl,
    currentIndex,
    updateIndex,
    animationDirection,
    currentPicture,
    nextImage,
    previousImage,
  };
}
