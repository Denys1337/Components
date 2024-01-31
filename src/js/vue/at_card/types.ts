import { ButtonSize } from '../at_button/types';
import { MenuItemList } from '../at_menu/types';
export const TITLE_MAX_LENGTH = 18;
export const INFO_MAX_LENGTH = 25;
export const CONTENT_MAX_LENGTH = 126;

export interface AtCardProps {
  additionalInfo?: string;
  buttonContent?: string;
  buttonSize: ButtonSize;
  clickable: boolean;
  clickableCardText?: string;
  defaultAddCard: boolean;
  description: string;
  cardClickableDisabled: boolean;
  extended: boolean;
  height: string;
  id?: string;
  imageSize?: string;
  imageUrl?: string;
  menuItems: MenuItemList;
  showButton?: boolean;
  showDividerLine: boolean;
  showImage: boolean;
  subTitle: string;
  tag: string;
  title: string;
}
export enum CardTypes {
  Clickable = 'CLICKABLE',
  Regular = 'REGULAR',
}
