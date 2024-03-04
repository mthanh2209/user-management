/**
 * Checks if an item is assigned to a user.
 * @param userId - The ID of the user.
 * @param itemId - The ID of the item.
 * @param userItems - The array of user items.
 * @param key - The key to match against the item ID.
 * @returns True if the item is assigned to the user, otherwise false.
 */
export const isItemAssignedToUser = (
  userId: number,
  itemId: number,
  userItems: any[],
  key: string
) => userItems?.some((item) => item.userId === userId && item[key] === itemId);
