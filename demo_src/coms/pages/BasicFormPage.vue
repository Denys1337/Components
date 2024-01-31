<template>
  <div class="BasicFormPage">
    <h1>Basic Form</h1>
    <div class="form-page-grid d-grid grid-template-2-parts-xs">
      <aside class="">
        <TabledObject :values="vals" title="Form values" />
        <TabledObject :values="data" title="Values retrieved from AtForm @change" />
      </aside>
      <section class="">
        <AtFormControl @change="onInputChangeHandler" @valid="onValidHandler">
          <div class="form d-flex flex-column elevation-level-02">
            <div class="input-row d-flex jc-space-between">
              <AtInput title="Email" name="email" v-model="vals.email" :required="true" />
            </div>
            <ul class="options d-flex flex-column">
              <li>
                <AtCheckbox :label="'Task A'" input-value="a" v-model="vals.options['a']" />
                <AtBadge :type="`${vals.options['a'] ? 'done' : 'in_progress'}`" />
              </li>
              <li>
                <AtCheckbox :label="'Task B'" input-value="b" v-model="vals.options['b']" />
                <AtBadge :type="`${vals.options['b'] ? 'done' : 'in_progress'}`" />
              </li>
              <li>
                <AtToggle label="Requires Review" v-model="vals.requiresReview" />
              </li>
            </ul>
            <AtRadiogroup
              name="urgency"
              v-model="vals.urgency"
              :options="urgencyItems"
              direction="column"
            />
            <AtTextarea name="notes" v-model="vals.text" :required="true" />
            <AtButton @click="submit" :disabled="!data.valid">Submit</AtButton>
            <p v-if="vals.menuChoice">{{ computedTextMenuChoice }}</p>
          </div>
        </AtFormControl>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';

  import AtBadge from '../../../src/js/vue/at_badge/AtBadge.vue';
  import AtButton from '../../../src/js/vue/at_button/AtButton.vue';
  import AtCheckbox from '../../../src/js/vue/at_checkbox/AtCheckbox.vue';
  import AtFormControl from '../../../src/js/vue/at_form_control/AtFormControl.vue';
  import { FormControlChangeData } from '../../../src/js/vue/at_form_control/types';
  import AtInput from '../../../src/js/vue/at_input/AtInput.vue';
  import AtRadiogroup from '../../../src/js/vue/at_radiogroup/AtRadiogroup.vue';
  import AtTextarea from '../../../src/js/vue/at_textarea/AtTextarea.vue';
  import AtToggle from '../../../src/js/vue/at_toggle/AtToggle.vue';
  import TabledObject from '../comps/TabledObject.vue';

  import './basicFormPage.scss';

  export default defineComponent({
    components: {
      AtFormControl,
      AtInput,
      TabledObject,
      AtBadge,
      AtButton,
      AtCheckbox,
      AtRadiogroup,
      AtTextarea,
      AtToggle,
    },
    setup() {
      const urgencyItems = ref([
        {
          text: 'Normal',
          value: '1',
        },
        {
          text: 'Urgent',
          value: '2',
        },
        {
          text: 'Immediate',
          value: '3',
        },
      ]);
      const data = reactive<Record<string, unknown>>({
        email: '',
        urgency: '1',
        notes: '',
        valid: false,
      });
      const vals = reactive({
        email: '',
        options: {
          a: false,
          b: false,
        },
        urgency: '1',
        text: '',
        requiresReview: false,
      });

      function onInputChangeHandler(newData: FormControlChangeData) {
        Object.entries(newData).forEach((item) => {
          data[item[0]] = item[1].value;
        });
      }

      function onValidHandler(isValid: boolean) {
        data.valid = isValid;
      }

      function submit() {
        alert('Submit!');
      }

      return {
        vals,
        data,
        urgencyItems,
        onInputChangeHandler,
        onValidHandler,
        submit,
      };
    },
  });
</script>
