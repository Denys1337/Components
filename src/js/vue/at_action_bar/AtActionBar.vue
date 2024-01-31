<template>
  <nav class="AtActionBar">
    <section class="actions-start" v-if="startActions.length">
      <ActionOrField
        @click="actionClickHandler(action, $event)"
        @update:modelValue="inputHandler(action, $event)"
        :size="action.actionType === ActionType.Button ? buttonsSize : undefined"
        :visual="buttonsVisual"
        v-bind="action"
        :key="action.name"
        v-for="action of startActions"
      />
    </section>
    <section class="actions-end">
      <template v-if="endActions.length">
        <ActionOrField
          @click="actionClickHandler(action, $event)"
          @update:modelValue="inputHandler(action, $event)"
          :size="action.actionType === ActionType.Button ? buttonsSize : undefined"
          :visual="buttonsVisual"
          v-bind="action"
          :key="action.name"
          v-for="action of endActions"
        />
      </template>
      <AtMenu
        @menu-item-click="$emit('menu-item-click', $event)"
        :menu-item-list="menuActions"
        v-if="menuActions.length"
      >
        <AtButton :visual="buttonsVisual" :size="buttonsSize" is-square>
          <template #start>
            <DotsVerticalIcon size="24" />
          </template>
        </AtButton>
      </AtMenu>
    </section>
  </nav>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { DotsVerticalIcon } from 'vue-tabler-icons';

  import AtButton from '../at_button/AtButton.vue';
  import AtMenu from '../at_menu/AtMenu.vue';
  import { MenuItemList } from '../at_menu/types';
  import ActionOrField from './components/ActionOrField.vue';
  import { ActionOrFieldProps, ActionType } from './types';

  export default defineComponent({
    name: 'AtActionBar',
    components: { AtMenu, AtButton, ActionOrField, DotsVerticalIcon },
    props: {
      buttonsSize: { type: String, default: 'm' },
      buttonsVisual: { type: String, default: 'secondary' },
      startActions: { type: Array as PropType<ActionOrFieldProps[]>, default: () => [] },
      endActions: { type: Array as PropType<ActionOrFieldProps[]>, default: () => [] },
      menuActions: { type: Array as PropType<MenuItemList>, default: () => [] },
    },

    emits: [
      //Will be emit for 'button' type actions
      'menu-item-click',
      //Will be emit for 'field' type actions
      'menu-item-input',
    ],
    setup(_, { emit }) {
      const actionClickHandler = (action: ActionOrFieldProps) => {
        if (action.actionType !== ActionType.Field) {
          emit('menu-item-click', action);
        }
      };
      const inputHandler = (action: ActionOrFieldProps, input: unknown) => {
        if (action.actionType === ActionType.Field) {
          emit('menu-item-input', action, input);
        }
      };

      return { actionClickHandler, inputHandler, ActionType };
    },
  });
</script>

<style lang="scss">
  .AtActionBar {
    --actions-gap: var(--spacing-02);
    align-items: flex-start;
    display: grid;
    grid-auto-flow: column dense;
    gap: var(--actions-gap);
    .actions {
      &-start,
      &-end {
        display: flex;
        gap: var(--actions-gap);
        align-items: flex-start;
        flex-wrap: wrap;
        word-break: keep-all;
      }
      &-end {
        justify-content: end;
      }
      &-start {
        justify-content: flex-start;
      }
    }
  }
</style>
