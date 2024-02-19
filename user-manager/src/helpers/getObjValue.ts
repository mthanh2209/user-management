/**
 * Retrieves the value of a specific key from an object.
 * @param obj - The object from which to retrieve the value.
 * @param key - The key whose value is to be retrieved from the object.
 * @returns The value corresponding to the provided key in the object.
 */
export const getObjValue = <T, Key extends keyof T>(
  obj: T,
  key: Key
): T[Key] => {
  return obj[key];
};
