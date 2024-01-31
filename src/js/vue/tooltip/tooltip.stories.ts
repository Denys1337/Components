import { getCurrentInstance, onMounted, ref } from 'vue';

import { Story } from '@storybook/vue3';

import createId from '@agritask/js-utils/libs/createId';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from '../at_button/AtButton.vue';
import Tooltip from './Tooltip.vue';
import { tooltipProps, TooltipProps } from './types';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [DefaultDecorator],
};

const defaultProps: TooltipProps = {
  position: 'bottom',
  triggerWithClick: false,
  offset: tooltipProps.offset.default,
  reference: '',
  show: undefined,
  updateOnScroll: false,
  updateOnResize: false,
  closeOnLeave: true,
  observeContent: false,
};

const TooltipStory: Story = (args) => ({
  name: 'TooltipStory',
  components: { Tooltip },
  setup() {
    const id = createId('tooltip');
    return {
      args,
      id,
    };
  },
  template: `
    <div>
      <button :id="id"> {{ args.position }} </button>
      <Tooltip v-bind="{...args}" :reference="'#' + id">
        Text
      </Tooltip>
    </div>
  `,
});

const longToolTipText =
  'A very very very very very very very very very very very very very very very very very very very long tooltip';

const LongTooltipStory: Story = (args) => ({
  name: 'LongTooltipStory',
  components: { Tooltip },
  setup() {
    const id = createId('tooltip');

    return {
      args,
      tip: longToolTipText,
      id,
    };
  },
  template: `
    <div>
      <button :id="id"> {{ args.position }} </button>
      <Tooltip v-bind="{...args}" :reference="'#' + id">
        {{ tip }}
      </Tooltip>
    </div>
  `,
});

export const Top = TooltipStory.bind({});
Top.args = { ...defaultProps, position: 'top' };

export const LongToolTipTop = LongTooltipStory.bind({});
LongToolTipTop.args = { ...defaultProps, position: 'top' };

export const Bottom = TooltipStory.bind({});
Bottom.args = { ...defaultProps };

export const LongToolTipBottom = LongTooltipStory.bind({});
LongToolTipBottom.args = { ...defaultProps };

export const Right = TooltipStory.bind({});
Right.args = { ...defaultProps, position: 'right' };

export const LongToolTipRight = LongTooltipStory.bind({});
LongToolTipRight.args = { ...defaultProps, position: 'right' };

export const Left = TooltipStory.bind({});
Left.args = { ...defaultProps, position: 'left' };

export const LongToolTipLeft = LongTooltipStory.bind({});
LongToolTipLeft.args = { ...defaultProps, position: 'left' };

export const ControlOffSet = LongTooltipStory.bind({});
ControlOffSet.args = { ...defaultProps, offset: 30 };

export const TriggerWithClick = TooltipStory.bind({});
TriggerWithClick.args = { ...defaultProps, triggerWithClick: true };

export const ControlledComponent = () => ({
  name: 'TooltipControlledComponent',
  components: { Tooltip, AtButton },
  setup() {
    const show = ref(false);
    return {
      tip: longToolTipText,
      show,
    };
  },
  template: `
  <div>
    <AtButton id="tooltip-button"> Button </AtButton>
    <Tooltip reference="#tooltip-button" :show="show" position="top">
      {{ tip }}
    </Tooltip>
    <div style="margin-top: 30px;">
      <AtButton @click="show = true"> Show tooltip </AtButton>
      <AtButton @click="show = false" class="danger"> Hide tooltip </AtButton>
      <AtButton @click="show = undefined" class="secondary"> Uncontrol tooltip </AtButton>
      <div class="mt-5"> Control status - {{ show !== undefined ? 'controlled' : 'uncontrolled' }} </div>
    </div>
  </div>
  `,
});
export const SeveralTooltips = () => ({
  name: 'SeveralToolTipsStory',
  components: { Tooltip, AtButton },
  setup() {
    return {
      tip: longToolTipText,
    };
  },
  template: `
    <div>
      <AtButton id="tooltip-button-right"> Right </AtButton>
      <AtButton id="tooltip-button-top"> Top </AtButton>
      <AtButton id="tooltip-button-bottom"> Bottom </AtButton>
      <AtButton id="tooltip-button-left"> Left </AtButton>
      <Tooltip reference="#tooltip-button-right" position="right" key="right">
        {{ tip }}
      </Tooltip>
      <Tooltip reference="#tooltip-button-top" position="top" key="top">
        {{ tip }}
      </Tooltip>
      <Tooltip reference="#tooltip-button-bottom" position="bottom" key="bottom">
        {{ tip }}
      </Tooltip>
      <Tooltip reference="#tooltip-button-left" position="left" key="left">
        {{ tip }}
      </Tooltip>
    </div>
  `,
});

export const TooltipWithRef = () => ({
  name: 'TooltipWithRef',
  components: { Tooltip },
  setup() {
    const buttonRef = ref();
    return {
      buttonRef,
      tip: longToolTipText,
    };
  },
  template: `
    <div>
      <button ref="buttonRef" style="border: 1px solid grey; padding: 10px 15px;"> Ref </button>
      <Tooltip :reference="buttonRef">
        {{ tip }}
      </Tooltip>
    </div>
  `,
});

export const ElementAsReference = () => ({
  name: 'ElementAsReference',
  components: { Tooltip },
  setup() {
    const element = ref();
    onMounted(() => {
      const vm = getCurrentInstance()?.proxy;
      element.value = vm?.$el?.parentElement;
    });
    return {
      tip: longToolTipText,
      element,
    };
  },
  template: `
    Element Reference
    <Tooltip :reference="element">
      {{ tip }}
    </Tooltip>
  `,
});

export const DontCloseOnLeave = LongTooltipStory.bind({});
DontCloseOnLeave.args = { ...defaultProps, closeOnLeave: false };

export const DontCloseOnLeaveWithClose: Story = (args) => ({
  name: 'DontCloseOnLeaveWithClose',
  components: { Tooltip, AtButton },
  setup() {
    return {
      args,
      text: longToolTipText,
      id: createId('DontCloseOnLeaveWithClose'),
    };
  },
  template: `
      <div>
        <AtButton :id="id"> {{ args.position }} </AtButton>
        <Tooltip v-bind="{...args}" :close-on-leave="false" :reference="'#' + id">
          <template #default="slotProps">
            {{ text }}
            <div style="margin-top: 10px;">
              <AtButton @click="slotProps.close()" class="secondary">Close</AtButton>
            </div>
          </template>
        </Tooltip>
      </div>
    `,
});

DontCloseOnLeaveWithClose.args = { ...defaultProps };

export const Overflow = () => ({
  name: 'Overflow',
  components: { Tooltip },
  setup() {
    return {
      props: defaultProps,
      text: longToolTipText,
      id: createId('Overflow'),
    };
  },
  template: `
      <div>
        <button :id="id" class="btn btn-primary"> {{props.position}} </button>
        <Tooltip v-bind="{...props}" :reference="'#' + id" :close-on-leave="false" maxHeight="100px" style="max-width: 450px;">
          <table>
            <thead>
              <tr>
                <th v-for="i in 6">Header</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 10">
                <td v-for="i in 6">cell</td>
              </tr>
            </tbody>
          </table>
        </Tooltip>
      </div>
    `,
});

export const TooltipWithWindowScrollAndResize = () => ({
  name: 'TooltipWithWindowScrollAndResize',
  components: { Tooltip, AtButton },
  setup() {
    return {
      tip: longToolTipText,
      id: createId('tooltip-scrol-and-resize'),
    };
  },
  template: `
    <div style="margin-top: 1000px; height: 2000px; overflow: auto; text-align: center;">
      <div style="width: 3000px; padding: 50px 0; background: red;">
        <AtButton :id="id"> Top </AtButton>
        <Tooltip :reference="'#' + id" position="top" updateOnScroll updateOnResize>
          {{ tip }}
        </Tooltip>
      </div>
    </div>
  `,
});
