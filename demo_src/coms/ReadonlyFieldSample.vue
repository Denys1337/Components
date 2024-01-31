<template>
  <div class="ReadonlyFieldSample">
    <h2>ReadonlyField</h2>
    <ReadonlyField label="String value" :content="'welcome'" />
    <ReadonlyField label="Numberic value" :content="420.69" />
    <ReadonlyField label="Boolean value" :content="true" />
    <ReadonlyField label="Date value" :content="date" />
    <ReadonlyField label="Object value" :content="{ name: 'John Snow', age: 22 }" />
    <ReadonlyField
      label="Array value"
      :content="['some text', 420.69, { name: 'John Snow', age: 22 }]"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import ReadonlyField from '@/vue/readonly_field/ReadonlyField.vue';

  export default defineComponent({
    name: 'DemoApp',
    components: { ReadonlyField },
    setup() {
      const date = new Date();

      return { date };
    },
  });
</script>
