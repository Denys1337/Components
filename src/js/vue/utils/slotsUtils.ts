import { VNode } from 'vue';

type Slot = (...args: any[]) => VNode[];
type Slots = { [name: string]: Slot | undefined };
export const hasNonEmptySlot = (slots: Readonly<Slots>) =>
  slots.default &&
  slots.default().findIndex((o) => !!o.el?.textContent?.replaceAll('\n', '').trim().length);
