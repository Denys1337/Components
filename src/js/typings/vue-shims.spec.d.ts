import Vue, { ComponentOptions } from 'vue';

import user from '@testing-library/user-event';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentHarness, ConfigurationCallback, RenderOptions } from '@testing-library/vue';

type UserEvent = typeof user;

interface CustomUserEvent extends UserEvent {
  pressKeys(
    keys: string[],
    modifiers: {
      altKey: boolean;
      shiftKey: boolean;
      ctrlKey: boolean;
      metaKey: boolean;
      getModifierState(key: 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey'): boolean;
    }
  ): Promise<void>;

  wait(timeInMillis: number): Promise<void>;
}

type Component<V extends Vue> = Omit<ComponentOptions<V>, 'template' | 'render'>;

interface CustomComponentHarness extends ComponentHarness {
  user: CustomUserEvent;
  emitted(): { [key: string]: any[][] };
  emitted(event: string): any[][];
}

declare global {
  export function createRenderer<V extends Vue>(
    component: Component<V>,
    options?: RenderOptions<V>,
    configure?: ConfigurationCallback<V>
  ): (template: string, options?: Component<V>) => CustomComponentHarness;

  export function cleanup(): void;
}
