import { InjectionKey, Ref } from 'vue';

export interface InputState {
  value: any;
  valid: boolean;
  ignored: boolean;
}
export type DataKeys = 'email' | 'urgency' | 'notes' | 'valid';
export type FormControlChangeData = Record<DataKeys, InputState>;

export interface FormActions {
  addInput: (value: any, valid: boolean, name: DataKeys, ignored: boolean) => void;
  removeInput: (name: DataKeys) => void;
  updateInput: (name: DataKeys, value: any, valid: boolean) => void;
  formDisplayErrors: Readonly<Ref<boolean>>;
}

export const FORM_INJECTION: InjectionKey<FormActions> = Symbol.for('form');
