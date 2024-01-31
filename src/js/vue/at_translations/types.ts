import { Component, Ref } from 'vue';

export type Locales =
  | 'en'
  | 'bg'
  | 'de'
  | 'es'
  | 'fr'
  | 'he'
  | 'it'
  | 'nl'
  | 'pt'
  | 'ru'
  | 'th'
  | 'uk'
  | 'vi';

export interface TranslationField {
  component: Component;
  label: string;
  originalValue: Ref<string> | string;
  props?: unknown;
  name: string;
}

export type TranslationObject = Partial<Record<Locales, Record<string, string>>>;
