import { Ref, onMounted, onUnmounted } from 'vue';

type ElementOrNull = Element | null;

export default function usePortalRef(
  refToPortal: Ref<undefined | Node>,
  portalTo: ElementOrNull,
  attachToFullscreenRoot?: boolean
) {
  const isInFullscreen = !!document.fullscreenElement;
  const decidedPortalTo =
    attachToFullscreenRoot && isInFullscreen ? document.fullscreenElement : portalTo;

  onMounted(() => {
    if (refToPortal.value && decidedPortalTo) {
      decidedPortalTo.appendChild(refToPortal.value);
    }
  });

  onUnmounted(() => {
    if (refToPortal.value && decidedPortalTo && decidedPortalTo.contains(refToPortal.value)) {
      decidedPortalTo.removeChild(refToPortal.value);
    }
  });
}
