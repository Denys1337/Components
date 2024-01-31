import { MenuItemList } from '../../at_menu/types';
import { AtQuestionSettings, TranslatableField, Option, AtQuestionType } from '../types';

export interface AtFormBuilderSection {
  id: string;
  title: TranslatableField;
  fields: AtFormBuilderQuestion[];
  sections?: AtFormBuilderSubSection[];
  sectionType: AtFormBuilderSectionType;
}

export interface AtFormBuilderSubSection {
  id: string;
  title: TranslatableField;
  fields: AtFormBuilderQuestion[];
  sectionType: AtFormBuilderSectionType;
  settings: {
    repeatable: boolean;
    grouped: boolean;
    minStack: number;
    maxStack: number | null;
  };
  externalGroupId: string;
}

export enum AtFormBuilderSectionType {
  SUBSECTION = 'SUBSECTION',
  Normal = 'NORMAL',
}

export interface AtFormBuilderQuestion {
  id: string;
  title: TranslatableField;
  fieldType: AtQuestionType;
  settings: AtQuestionSettings;
  toolTip?: TranslatableField;
  options?: Option[];
  questionMenuList?: MenuItemList;
}

export interface AtFormBuilderProps {
  sections: AtFormBuilderSection[];
  selectedSection: AtFormBuilderSection;
  questionMenuList: MenuItemList;
}

export enum QuestionnaireTypeStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Archived = 'ARCHIVED',
}
export interface QuestionnaireType {
  description?: TranslatableField;
  id: string;
  name: TranslatableField;
  localizedName: string;
  localizedDescription: string;
  version: string;
  isExternal: boolean;
  createdOn: string;
  createdBy: string;
  lastEditor: string;
  lastUpdate: string;
  imageId?: string;
  targetType?: string;
  levels?: number;
  status: QuestionnaireTypeStatus;
  projectId?: string;
  formDefinitionId?: string;
  activeFrom?: string;
  activeUntil?: string;
  isLatest?: boolean;
}

export interface FormDefinition {
  formDefinition: FormData | null;
  imageId: string | null;
  isPublished: boolean;
}

export type FormData = {
  fieldsMetaData: string[];
  sections: AtFormBuilderSection[];
};

export enum PossibleQuestionTypes {
  Question = 'question',
  Stack = 'stack',
}

export interface EditQuestionArgs {
  question: AtFormBuilderQuestion;
  questionIndex: number;
  subsectionIndex?: number;
}

export interface RenameQuestionArgs extends EditQuestionArgs {
  title: string;
}
