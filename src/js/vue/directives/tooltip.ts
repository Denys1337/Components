import {
  defineAsyncComponent,
  Directive,
  h,
  ref,
  createApp,
  nextTick,
  DirectiveBinding,
} from 'vue';

import createId from '@agritask/js-utils/libs/createId';

import { TooltipProps } from '../tooltip/types';

const Tooltip = defineAsyncComponent(
  () => import(/* webpackChunkName: "Tooltip" */ '../tooltip/Tooltip.vue')
);
export const DIRECTIVE_TOOLTIP_ID = 'directive_tooltip';
type TooltipDerctiveSettings = Partial<TooltipProps> & { shouldDisplay?: boolean; text?: string };
enum TooltipDerctiveModifiers {
  Overflow = 'overflow',
}
export interface TooltipDirectiveBinding extends DirectiveBinding {
  value: TooltipDerctiveSettings;
  modifiers: Partial<Record<TooltipDerctiveModifiers, boolean>>;
}

const dynamicProps = ref<TooltipDerctiveSettings>();
const idToBinding = new Map<string, TooltipDirectiveBinding | undefined>();
const idToHandler = new Map<string, (event: MouseEvent) => void>();
const isTooltipRendered = ref<boolean>(false);

export const tooltip: Directive = {
  mounted: onComponentMounted,
  updated: onBindingUpdated,
  unmounted: onComponentUnmounted,
};

function mouseOverHandler(el: HTMLElement) {
  const id = el.getAttribute('id');
  if (!id) return;
  const isOverflowTooltip = idToBinding.get(id)?.modifiers.overflow;
  if (!isOverflowTooltip || el.scrollWidth > el.clientWidth) {
    showTooltip(id);
  }
}

function onComponentMounted(el: HTMLElement, binding: TooltipDirectiveBinding) {
  if (binding.modifiers.overflow) {
    el.setAttribute(
      'style',
      `
      overflow: hidden;
      text-overflow: ellipsis;
      `
    );
  }
  let id = el.getAttribute('id');
  if (!id) {
    id = createId('tooltip-directive');
    el.setAttribute('id', id);
  }
  onBindingUpdated(el, binding);
  if (!isTooltipRendered.value) {
    createTooltipComponent();
    isTooltipRendered.value = true;
  }
  const handler = () => mouseOverHandler(el);
  idToHandler.set(id, handler);
  el.addEventListener('mouseover', handler);
}

function onBindingUpdated(el: HTMLElement, binding: TooltipDirectiveBinding) {
  const id = el.getAttribute('id');
  if (!id) return;

  const newBinding = {
    ...binding,
    value: {
      shouldDisplay: true,
      ...binding?.value,
      text: binding?.value?.text || el?.textContent || '',
    },
  };
  idToBinding.set(id!, newBinding);

  clearTooltip();
}

function onComponentUnmounted(el: HTMLElement) {
  clearTooltip();
  const id = el.getAttribute('id');
  if (!id) return;

  const handler = idToHandler.get(id);
  handler && el.removeEventListener('mouseover', handler);
  idToHandler.delete(id);
  idToBinding.delete(id);
}

const showTooltip = (id: string) => {
  const settings = idToBinding.get(id)?.value;

  if (settings && settings.shouldDisplay) {
    dynamicProps.value = { ...settings, reference: `#${id}` };
  } else {
    clearTooltip();
  }
};

function createTooltipComponent() {
  const container = document.createElement('aside');
  container.classList.add('overflow-tooltip');
  document.body.appendChild(container);
  const app = createApp({
    computed: {
      dynamicProps() {
        return { id: DIRECTIVE_TOOLTIP_ID, ...dynamicProps.value };
      },
    },
    render() {
      // @ts-ignore - need to ignore for test
      return h(Tooltip, this.dynamicProps);
    },
  });
  app.mount(container);
}

const clearTooltip = () => {
  if (dynamicProps?.value?.reference) {
    dynamicProps.value.reference = '';
    dynamicProps.value.show = false;
    nextTick().then(() => {
      dynamicProps.value = {};
    });
  }
};
