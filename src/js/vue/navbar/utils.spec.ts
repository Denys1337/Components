import { MenuItem } from './types';
import { findInMenuItem } from './utils';

describe('findInMenuItem', () => {
  const menuItem: MenuItem = {
    name: '1',
    link: '',
    icon: '',
    children: [
      { name: '2', link: '#', icon: '' },
      { name: '3', link: '#', icon: '' },
      { name: '4', link: '#', icon: '' },
    ],
  };

  it('shoud return the whole menu if the menu name contains the query string', () => {
    const filtered = findInMenuItem('1', menuItem);

    expect((filtered as MenuItem).children?.length).toBe(menuItem.children?.length);
  });

  it('shoud return the filtered menu if the menu has children that contains the query string', () => {
    const filtered = findInMenuItem('2', menuItem);
    expect((filtered as MenuItem).children?.length).toBe(1);
  });

  it('shoud return the false if no match was found', () => {
    const filtered = findInMenuItem('6', menuItem);
    expect(filtered).toBe(false);
  });
});
