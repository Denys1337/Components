import { stringIncludesQueryInsensitive } from '@agritask/js-utils/libs/string_utils';

import { CollapsableMenuItem, MenuItem } from './types';

/**
 *
 * @param text : Query string
 * @param menuItem  : menuItems to query in
 * @returns Return the menu item as is if the string is in the menu item name || Filtered menu item with children that have the string in their name || false if no match found
 */
export function findInMenuItem(
  text: string,
  menuItem: MenuItem | CollapsableMenuItem
): MenuItem | CollapsableMenuItem | false {
  // Return the menu item as is if the string is in the menu item name
  if (stringIncludesQueryInsensitive(menuItem.name, text)) return menuItem;
  if (!menuItem.children) return false;

  // Filtered menu item with children that have the string in their name
  const filteredMenuItem: MenuItem | CollapsableMenuItem = {
    ...menuItem,
    children: menuItem.children?.filter((child) =>
      stringIncludesQueryInsensitive(child.name, text)
    ),
  };

  // Returns the filtred menu if its not empty and false if its empty
  return !!filteredMenuItem.children?.length && filteredMenuItem;
}
