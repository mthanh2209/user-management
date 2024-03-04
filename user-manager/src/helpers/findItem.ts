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
