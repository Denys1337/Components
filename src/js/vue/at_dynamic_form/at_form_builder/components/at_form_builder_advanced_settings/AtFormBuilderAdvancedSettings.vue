<template>
  <section class="AtFormBuilderAdvancedSettings block-end-06">
    <AtCollapse :button-label="$t('general.advanced')" v-model:collapsed="isAdvancedCollapsed">
      <AtAlert
        :type="AlertTypes.Warning"
        :title="idError.title"
        :content="idError.body"
        class="advanced block-end-02"
        v-if="typeof idError === 'object'"
      />
      <div class="d-flex ai-center">
        <AtInput
          :title="$t('form_builder.element_id.label')"
          class="w-100 inline-end-02"
          required
          v-model="idModel"
          :invalid="!!idError"
        />
        <i id="id-hint-icon">
          <InfoCircleIcon />
        </i>
        <slot></slot>
      </div>

      <Tooltip reference="#id-hint-icon">
        <span class="field-id-hint-tooltip">
          {{ $t('form_builder.element_id.hint') }}
        </span>
      </Tooltip>
    </AtCollapse>
  </section>
</template>
<script lang="ts">
  import { defineComponent, ref, defineAsyncComponent, computed, watch } from 'vue';

  import { InfoCircleIcon } from 'vue-tabler-icons';

  import { AlertTypes } from '../../../../at_alert/types';
  import AtCollapse from '../../../../at_collapse/AtCollapse.vue';
  import AtInput from '../../../../at_input/AtInput.vue';
  import getTranslators from '../../../../utils/getTranslators';
  import { atFormBuilderAdvancedSettingsProps } from './types';

  const AtAlert = defineAsyncComponent(
    () => import(/* webpackChunkName: "AtAlert" */ '../../../../at_alert/AtAlert.vue')
  );
  const Tooltip = defineAsyncComponent(
    () => import(/* webpackChunkName: "AtTooltip" */ '../../../../tooltip/Tooltip.vue')
  );
  export default defineComponent({
    name: 'AtFormBuilderAdvancedSettings',
    components: {
      AtCollapse,
      AtInput,
      AtAlert,
      InfoCircleIcon,
      Tooltip,
    },
    props: atFormBuilderAdvancedSettingsProps,
    emits: ['update:id', 'update:error'],
    setup(props, { emit }) {
      const idModel = computed<string>({
        get: () => props.id!,
        set: (id) => {
          emit('update:id', id);
        },
      });

      const isAdvancedCollapsed = ref(true);
      const showIdTooltip = ref(false);

      const isUniqueId = () => !props.existingIds.has(idModel.value);

      const { t } = getTranslators('form_builder.element_id');

      const idError = computed(() => {
        if (!idModel.value) return true;
        if (!/^[a-zA-Z0-9_-]*$/.test(idModel.value))
          return {
            title: t('valid_element_id_format.title'),
            body: t('valid_element_id_format.body'),
          };
        if (!isUniqueId()) return { title: t('unique') };
        return false;
      });
      watch(
        () => idError.value,
        () => {
          if (idError.value === false) {
            emit('update:error', false);
          } else {
            emit('update:error', true);
          }
        },
        { immediate: true }
      );

      return {
        showIdTooltip,
        idModel,
        idError,
        isAdvancedCollapsed,
        AlertTypes,
      };
    },
  });
</script>
<style lang="scss">
  .field-id-hint-tooltip {
    white-space: break-spaces;
  }
</style>
