import { mount } from '@vue/test-utils';

import UserWidget from './UserWidget.vue';

const mountUserWidget = (newProps: unknown) => {
  // @ts-ignore
  return mount(UserWidget, {
    props: newProps,
    global: {
      mocks: {
        $t: (a: string) => a,
      },
    },
  });
};

describe('HeaderLogo.vue mini', () => {
  const userWidget = mountUserWidget({ mini: true });
  it('should not have a name', () => {
    expect(userWidget.find('.user-name').exists()).toBe(false);
  });
  it('should not have a role', () => {
    expect(userWidget.find('.user-role').exists()).toBe(false);
  });
  it('should not have a logout', () => {
    expect(userWidget.find('.logout').exists()).toBe(false);
  });
  it('should not have a thumbnail', () => {
    expect(userWidget.find('.user-pic').exists()).toBe(true);
  });
});

describe('HeaderLogo.vue full size', () => {
  const userWidget = mountUserWidget({ mini: false, role: 'any role' });
  const userWidgetNoRole = mountUserWidget({ mini: false });
  it('should have a name', () => {
    expect(userWidget.find('.user-name').exists()).toBe(true);
  });
  it('should have a role', () => {
    expect(userWidget.find('.user-role').exists()).toBe(true);
  });
  it('should have a role', () => {
    expect(userWidgetNoRole.find('.user-role').exists()).toBe(false);
  });
  it('should have a logout', () => {
    expect(userWidget.find('.logout').exists()).toBe(true);
  });
  it('should have a thumbnail', () => {
    expect(userWidget.find('.user-pic').exists()).toBe(true);
  });
});

describe('HeaderLogo.vue thumbnail', () => {
  it('should take first letter of name if only name is provided', () => {
    const userWidget = mountUserWidget({ name: 'timur' });
    expect(userWidget.find('.user-pic').text()).toBe('t');
  });
  it('should take first letter of first name if only first name is provided', () => {
    const userWidget = mountUserWidget({ firstName: 'yuval' });
    expect(userWidget.find('.user-pic').text()).toBe('y');
  });
  it('should take first letter of first name if only first name is provided', () => {
    const userWidget = mountUserWidget({ lastName: 'alexander' });
    expect(userWidget.find('.user-pic').text()).toBe('a');
  });
  it('should take initials if first name and last name is provided', () => {
    const userWidget = mountUserWidget({ firstName: 'noam', lastName: 'morri' });
    expect(userWidget.find('.user-pic').text()).toBe('nm');
  });
  it('should take initials if first name and last name is provided and name is provided', () => {
    const userWidget = mountUserWidget({ firstName: 'noam', lastName: 'morri', name: 'loca' });
    expect(userWidget.find('.user-pic').text()).toBe('nm');
  });
});
