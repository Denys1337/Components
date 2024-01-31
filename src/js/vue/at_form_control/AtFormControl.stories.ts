import { storiesOf } from '@storybook/vue3';
import Joi from 'joi';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from '../at_button/AtButton.vue';
import AtInput from '../at_input/AtInput.vue';
import AtTextarea from '../at_textarea/AtTextarea.vue';
import AtFormControl from './AtFormControl.vue';
import { FormControlChangeData } from './types';

interface This {
  fields: any[];
  valid: boolean;
  showErrors: boolean;
}

storiesOf('Form/AtFormControl', module)
  .addDecorator(DefaultDecorator)
  .add('default', () => {
    return {
      components: { AtFormControl, AtInput, AtButton, AtTextarea },
      data: () => ({
        valid: false,
        showErrors: false,
        onlyLongFirstName: true,
        showMiddleName: true,
        firstname: '',
        middlename: '',
        lastname: '',
        email: 'test@gmail.com',
        fields: [],
        noFormInput: '',
        customInput: '',
        customRules: [Joi.string().min(3).max(5).required()],
        // radio
        animalOptions: [
          { text: 'snoopy', value: 'dog' },
          { text: 'hitchklif', value: 'cat' },
          { text: 'twitty', value: 'bird' },
        ],
        desc: '',
        selectedAnimal: null,
      }),
      methods: {
        onFormChanged(this: This, data: FormControlChangeData) {
          this.fields = Object.entries(data).map(([name, state]) => {
            return { name, ...state };
          });
        },
        onFormValidationChanged(this: This, valid: boolean) {
          this.valid = valid;
        },
        onSendClick(this: This) {
          this.showErrors = !this.valid;
          alert(this.valid ? 'VALID' : 'INVALID');
        },
      },
      template: `
      <div style="width: 100%; padding: 50px;">
        <div class="at-grid">
          <div class="at-col-6">
            <h3>with form control</h3>
            <input type="checkbox" v-model="onlyLongFirstName" id=""only_long_f_name_chk />
            <label for="only_long_f_name_chk">please enter {{ onlyLongFirstName ? "LONG" : "SHORT"}} first name</label>
            <br/>
            <br/>
            <at-form-control @change="onFormChanged" @valid="onFormValidationChanged" :showErrors="showErrors">
              <div class="at-grid block-end-xl">
                <div class="at-col">
                  <at-input v-model="firstname" title="first name" :minlength="onlyLongFirstName ? 6 : 0" :maxlength="12" :required="true" />
                </div>
              </div>
              <div class="at-grid block-end-xl">
                <div class="at-col">
                  <input type="checkbox" v-model="showMiddleName" id="middle_name_chk" />
                  <label for="middle_name_chk">has middle name</label>
                  <br v-show="showMiddleName" />
                  <br v-show="showMiddleName" />
                  <at-input v-model="middlename" title="middle name" name="middleName" v-show="showMiddleName" :required="true" />
                </div>
              </div>
              <div class="at-grid block-end-xl">
                <div class="at-col">
                  <at-input v-model="lastname" title="last name" />
                </div>
              </div>
              <div class="at-grid block-end-xl">
                <div class="at-col">
                  <at-input type="email" v-model="email" title="email" name="email" :required="true" />
                </div>
              </div>
              <div class="at-grid block-end-xl">
                <div class="at-col">
                  <at-input v-model="customInput" title="3 to 5 letters" name="CustomField" :rules="customRules" />
                </div>
              </div>
              <div class="at-grid block-end-xl">
                <div class="at-col">
                  <at-textarea :required="true" v-model="desc" title="description" />
                </div>
              </div>
              <div class="at-grid block-end-xl">
                <div class="at-col">
                  <at-button @click="onSendClick">SEND</at-button>
                </div>
              </div>
              <br/>
            </at-form-control>
          </div>
          <div class="at-col-6">
            <div style="position: sticky; top: 0;">
              <h4>form is valid? {{ valid }}</h4>
              <table>
                <tbody>
                  <tr>
                    <th>name</th>
                    <th>value</th>
                    <th>valid</th>
                  </tr>
                  <tr v-for="field in fields">
                    <td>{{ field.name }}</td>
                    <td>{{ field.value }}</td>
                    <td>{{ field.valid }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="at-grid">
          <div class="at-col-6">
            <h3>without form control</h3>
            <at-input v-model="noFormInput" title="first name" />
          </div>
        </div>
      </div>`,
    };
  });
