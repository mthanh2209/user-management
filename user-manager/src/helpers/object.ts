// Types
import { IItemNav } from '@types';

// Helpers
import { getRandomColor } from '@helpers/string';

/**
 * Converts a File object to a Data URL asynchronously.
 * @param file - The File object to convert.
 * @returns A Promise that resolves with the Data URL of the file or rejects with an error message.
 */
export const convertToDataURL = (file?: File) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('File is missing');
      return;
    }

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onloadend = (event) => {
      const imageUrl = event.target?.result;
      if (imageUrl) {
        resolve(imageUrl.toString());
      } else {
        reject('Error converting file to data URL');
      }
    };

    fileReader.onerror = () => {
      reject('Error reading the file');
    };
  });
};

/**
 * Fetches data from the specified URL.
 *
 * @param url - The URL to fetch the data from.
 * @returns A promise that resolves to the fetched data.
 * @throws An error if an error occurs while fetching the data.
 *
 * @template T - The type of the data to be fetched.
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${url}. Status: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
};

/**
 * Filter items based on search keyword.
 * @template T - The type of items being filtered.
 * @param {T[] | undefined} items - The array of items to filter.
 * @param {string} searchKeyword - The keyword to search for.
 * @returns {T[]} - The filtered array of items.
 */
export const filterItem = <
  T extends {
    name?: string;
    fullName?: string;
    email?: string;
    description?: string;
  }
>(
  items: T[] | undefined,
  searchKeyword: string
): T[] => {
  if (!items) {
    return []; // Return an empty array if items is undefined
  }

  return items.filter((item) => {
    const lowercaseKeyword = searchKeyword.toLowerCase();
    return (
      (item.fullName &&
        item.fullName.toLowerCase().includes(lowercaseKeyword)) ||
      (item.email && item.email.toLowerCase().includes(lowercaseKeyword)) ||
      (item.name && item.name.toLowerCase().includes(lowercaseKeyword)) ||
      (item.description &&
        item.description.toLowerCase().includes(lowercaseKeyword))
    );
  });
};

/**
 * Formats a date string into a localized date and time string representation.
 * @param data - The date string to format.
 * @returns A string representing the formatted date and time in the user's locale.
 */
export const formatDate = (data: string) => {
  const dateData = new Date(data);
  return dateData.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium'
  });
};

/**
 * Generates a new user object with default or provided information.
 * @param fullName - The full name of the new user.
 * @returns An object representing a new user with default or initialized values.
 */
export const generateNewUser = (fullName: string) => {
  return {
    avatar: '',
    fullName,
    email: '',
    isActive: false,
    registeredDate: formatDate(new Date().toString()),
    lastModifiedDate: null,
    details: '',
    bgColor: getRandomColor()
  };
};

/**
 * Generates a new role object with default or provided information.
 * @param name - The name of the new role.
 * @returns An object representing a new role with default or initialized values.
 */
export const generateNewRole = (name: string) => {
  return {
    avatar: '',
    name,
    bgColor: getRandomColor()
  };
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
