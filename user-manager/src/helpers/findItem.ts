import { IItemNav } from "@types";

/**
 * Finds the ID of a user item.
 * @param userId - The ID of the user.
 * @param itemId - The ID of the item.
 * @param userItems - The array of user items.
 * @returns The ID of the user item, or null if not found.
 */
export const findUserItemId = (
  userId: number,
  itemId: number,
  userItems: any[],
  key: string
) => {
  const userItem = userItems.find(
    (item) => item.userId === userId && item[key] === itemId
  );

  return userItem ? userItem.id : null;
};

/**
 * Finds the ID of a role item.
 *
 * @param {number} roleId - The ID of the role.
 * @param {number} itemId - The ID of the item.
 * @param {any[]} roleItems - The array of role items.
 * @param {string} key - The key to match against the item ID.
 * @returns {number | null} - The ID of the role item, or null if not found.
 */
export const findRoleItemId = (
  roleId: number,
  itemId: number,
  roleItems: any[],
  key: string
) => {
  const roleItem = roleItems.find(
    (item) => item.roleId === roleId && item[key] === itemId
  );

  return roleItem ? roleItem.id : null;
};

/**
 * Finds the index of the selected item based on the current pathname.
 * If no matching item is found, returns the default index (0).
 * @param {Array<IItemNav>} navigateItems - An array of navigation items.
 * @param {object} location - The location object returned by the useLocation hook.
 * @returns {number} - The index of the selected item.
 */
export const findSelectedIndex = (
  navigateItems: Array<IItemNav>,
  location: { pathname: string }
): number => {
  // Find the index of the selected item based on the current pathname
  let itemSelected = navigateItems.findIndex((item) => {
    return location.pathname.includes(item.label);
  });

  // If no matching item is found, set the default index to 0
  return itemSelected < 0 ? 0 : itemSelected;
};
