import faker from 'faker';

import createId from '@agritask/js-utils/libs/createId';

import { BadgeTypes } from '../../../src/js/vue/at_badge/types';
import { AttentionTypes } from '../../../src/js/vue/at_table/cells/badge_cell/types';
import { ColumnType, Row } from '../../../src/js/vue/at_table/types';
import { ColumnConfig, ColumnConfigExtended } from '../../../src/js/vue/at_table/types';
import { randomFromArray, randomNumber } from './utils';

export const columns: ColumnConfig[] = [
  {
    title: 'ID- very long and not really used title',
    type: ColumnType.Text,
    sortable: true,
    name: 'id',
    width: 'oneLine',
    limitation: 3,
    visible: true,
    resizable: true,
  },
  {
    title: 'badge',
    type: ColumnType.Badge,
    sortable: true,
    name: 'badge',
    visible: true,
  },
  {
    title: 'Attention required',
    type: ColumnType.Attention,
    name: 'attention',
    width: 'auto',
    visible: true,
    resizable: true,
  },
  { title: 'Link', type: ColumnType.Link, name: 'link', width: 'auto', visible: true },
  { title: 'Date', type: ColumnType.Date, name: 'date', width: 'auto', visible: true },
  {
    title: 'Photos',
    type: ColumnType.Images,
    name: 'images',
    sortable: true,
    width: 'auto',
    visible: true,
  },
  { title: 'Text', type: ColumnType.Text, name: 'name', width: 'auto', visible: true },
  { title: 'Text with hint', type: ColumnType.Text, name: 'hint', width: 'auto', visible: true },
  { title: 'Notes', type: ColumnType.Text, name: 'notes', width: 'auto', visible: true },
  {
    title: 'Age',
    type: ColumnType.Number,
    name: 'age',
    width: 'auto',
    visible: true,
  },
  { title: 'City', type: ColumnType.Text, name: 'city', width: 'auto', visible: true },
  { title: 'Country', type: ColumnType.Text, name: 'country', width: 'auto', visible: true },
  {
    title: 'Avatar',
    type: ColumnType.Img,
    name: 'avatar',
    sortable: true,
    width: 'auto',
    visible: true,
  },
  {
    title: 'Is single',
    type: ColumnType.Boolean,
    name: 'single',
    width: 'oneLine',
    visible: true,
  },
  {
    title: 'Visited countries',
    type: ColumnType.List,
    name: 'visitedCountries',
    width: 'auto',
    limitation: 2,
    visible: true,
  },
  {
    title: 'Files',
    type: ColumnType.Files,
    name: 'files',
    width: 'auto',
    visible: true,
  },
  {
    title: 'Threshold',
    type: ColumnType.Threshold,
    name: 'threshold',
    width: 'auto',
    visible: true,
  },
  {
    title: 'Numeric',
    type: ColumnType.Number,
    name: 'numeric',
    width: 'auto',
    visible: true,
    resizable: true,
  },
];

export const columnsConfigExtended: ColumnConfigExtended[] = columns.map((column) => ({
  ...column,
  default: true,
}));

const createDataWithFunction = <Type>(quantity: number, createFunction: () => Type): Type[] => {
  const data: Type[] = [];
  for (let i = 0; i < quantity; i++) {
    data.push(createFunction());
  }
  return data;
};

const createVisitedCountries = (quantity = 5): string[] =>
  createDataWithFunction(quantity, faker.address.country);

const files = [
  { type: 'IMAGE', url: '/', title: 'Image file' },
  { type: 'JSON', url: '/', title: 'JSON file' },
  { type: 'EXCEL', url: '/', title: 'Excel file' },
  { type: 'ARCHIVE', url: '/', title: 'Archive' },
  { type: 'IMAGE', url: '/' },
  { url: '/', title: 'No icon' },
];
const images = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/300/300',
  'https://picsum.photos/200/400',
  'https://picsum.photos/100/400',
  'https://picsum.photos/400/400',
];
const badges = Object.values(BadgeTypes).map((badge) => ({ badgeType: badge }));

const createFiles = (quantity = 5) =>
  createDataWithFunction(quantity, () => files[Math.round(Math.random() * (files.length - 1))]);

const attentionTypes = Object.values(AttentionTypes);
const createRow = (): Row => ({
  name: faker.name.firstName(),
  attention: {
    hint: faker.lorem.words(Math.random() * 5),
    attentionRequired: randomFromArray(attentionTypes),
  },
  link: {
    href: 'https://picsum.photos/500/500',
    title: randomNumber({ max: 5000 }).toString(),
    hint: faker.lorem.words(Math.random() * 5),
  },
  badge: { value: 'Test', badgeType: BadgeTypes.Completed, hint: 'hint' },

  date: '21/05/2022 08:00',
  hint: { value: 'Title', hint: 'hint ' },
  notes: faker.lorem.words(Math.random() * 30),
  city: faker.address.city(),
  id: createId('fake_id'),
  avatar: faker.random.image(),
  images: randomFromArray(images, randomNumber({ max: 5 })),
  age: randomNumber({ max: 120 }),
  visitedCountries: createVisitedCountries(faker.random.number({ max: 2, min: 0 })),
  single: faker.random.boolean(),
  country: faker.address.country(),
  status: randomFromArray(badges),
  files: createFiles(10),
  threshold: {
    threshold: {
      value: 'first',
      gradeColor: 'fff', //olors['data-white'].substring(1),
      gradeThreshold: BadgeTypes.Low,
      gradeData: 1,
    },
    hint: 'string',
  },
  numeric: randomNumber({ max: 5000 }),
});

export const createData = (numberOfRows = 5): Row[] =>
  createDataWithFunction(numberOfRows, createRow);

export const columnsWithSubColumns: ColumnConfig[] = [
  {
    title: 'ID',
    type: ColumnType.Text,
    name: 'id',
    width: 'oneLine',
    limitation: 3,
    subcolumns: [],
    visible: true,
  },
  {
    title: 'threshold',
    type: ColumnType.Threshold,
    name: 'threshold',
    width: 'oneLine',
    limitation: 3,
    subcolumns: [],
    visible: true,
  },
  {
    title: 'Materials',
    name: 'object$materials',
    sortable: false,
    visible: true,
    subcolumns: [
      {
        title: 'Name',
        name: 'object$materials$1',
        sortable: false,
        type: ColumnType.Text,
      },
      {
        title: 'Usage',
        name: 'object$materials$2',
        sortable: false,
        type: ColumnType.Text,
      },
      {
        title: 'Concentration',
        name: 'object$materials$3',
        sortable: false,
        type: ColumnType.Text,
      },
      {
        title: 'Cost',
        name: 'object$materials$4',
        sortable: false,
        type: ColumnType.Text,
      },
    ],
    type: ColumnType.Subcolumns,
  },
];

const createRowWithSubColumns = (): Row => {
  const rowsInSubColumn = faker.random.number({ min: 1, max: 10 });
  return {
    id: faker.random.number({ min: 50 }),
    object$materials: {
      object$materials$1: createDataWithFunction(rowsInSubColumn, faker.commerce.productMaterial),
      object$materials$2: createDataWithFunction(rowsInSubColumn, faker.random.number),
      object$materials$3: createDataWithFunction(rowsInSubColumn, faker.random.number),
      object$materials$4: createDataWithFunction(rowsInSubColumn, faker.random.number).map(
        (val) => val + '.00$'
      ),
    },
  };
};

export const createDataWithSubColumns = (numberOfRows = 5): Row[] =>
  createDataWithFunction(numberOfRows, createRowWithSubColumns);
