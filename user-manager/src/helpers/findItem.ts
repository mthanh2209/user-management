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
