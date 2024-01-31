import { ref, computed } from 'vue';

import { Appearance, AtPopupHookProps, AtPopupProps } from '../../vue/at_popup/types';

export function useAtPopup() {
  const atPopupPropsModel = ref<AtPopupHookProps>({
    show: false,
    confirmCallback: undefined,
    closeCallback: undefined,
    appearance: Appearance.Regular,
    translationPath: '',
  });

  function popUpOk() {
    atPopupPropsModel.value.show = false;
    atPopupPropsModel.value.confirmCallback && atPopupPropsModel.value.confirmCallback();
  }
  function popUpClose() {
    atPopupPropsModel.value.show = false;
    atPopupPropsModel.value.closeCallback && atPopupPropsModel.value.closeCallback();
    atPopupPropsModel.value.closeCallback = undefined;
  }

  function showPopup(
    popupAppearance: Appearance,
    translationPath: string,
    confirmCallback?: () => void,
    closeCallback?: () => void,
    titleText?: string,
    contentText?: string,
    confirmText?: string,
    cancelText?: string,
    closeText?: string,
    additionalProps?: Partial<AtPopupProps>
  ) {
    atPopupPropsModel.value.show = true;
    atPopupPropsModel.value.appearance = popupAppearance;
    atPopupPropsModel.value.confirmCallback = confirmCallback;
    atPopupPropsModel.value.closeCallback = closeCallback;
    atPopupPropsModel.value.translationPath = translationPath;
    atPopupPropsModel.value.titleText = titleText;
    atPopupPropsModel.value.contentText = contentText;
    atPopupPropsModel.value.confirmText = confirmText;
    atPopupPropsModel.value.cancelText = cancelText;
    atPopupPropsModel.value.closeText = closeText;
    atPopupPropsModel.value.additionalProps = additionalProps;
  }

  const atPopupProps = computed(() => ({
    ...atPopupPropsModel.value,
    ...(atPopupPropsModel.value.additionalProps ?? {}),
  }));

  return {
    showPopup,
    atPopupProps,
    atPopupListeners: {
      ok: popUpOk,
      close: popUpClose,
    },
  };
}
