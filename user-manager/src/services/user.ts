import useSWR from 'swr';

// Types
import { IUser, IUserRole, IUserRule } from '@types';

// Constants
import { API } from '@constants';

// Helpers
import { fetcher, generateNewUser } from '@helpers';

export type IResponse = {
  data: any;
  error: string | null;
};

/**
 * Handles a successful response.
 * @param data - The response data.
 * @returns An object representing a successful response.
 */
const handleResponse = (data: any): IResponse => ({
  data,
  error: null
});

/**
 * Handles an error response.
 * @param error - The error object.
 * @returns An object representing an error response.
 */
const handleError = (error?: any): IResponse => ({
  error: error ? error.message : 'Something went wrong',
  data: null
});

/**
 * Makes an HTTP request and returns a promise that resolves to the response.
 * @param url - The URL to make the request to.
 * @param options - The options to include in the request.
 * @returns A promise that resolves to the response object.
 */
export const makeRequest = async (
  url: string,
  options?: RequestInit
): Promise<IResponse> => {
  try {
    const res = await fetch(url, options);
    return handleResponse(res);
  } catch (err) {
    return handleError(err);
  }
};

/**
 * Custom hook to fetch data using SWR.
 * @param url - The URL to fetch data from.
 * @returns An object containing the fetched data and a flag indicating whether the data is being validated.
 */
export const useApi = (
  url: string
): {
  data: any;
  error: string | null;
  mutate: () => Promise<any>;
} => {
  const { data, error, mutate } = useSWR(url, fetcher);
  return { data, error, mutate };
};

/**
 * Custom hook to fetch data using SWR without validation flag.
 * @param url - The URL to fetch data from.
 * @returns An object containing the fetched data.
 */
export const useApiData = (
  url: string
): { data: any; mutate: () => Promise<any> } => {
  const { data, mutate } = useSWR(url, fetcher);
  return { data, mutate };
};

/**
 * Fetches a list of users.
 * @returns An object containing the list of users and a flag indicating whether the data is being validated.
 */
export const getUsers = (): {
  data: IUser[];
  error: string | null;
  mutate: () => Promise<any>;
} => {
  const { data, error, mutate } = useApi(`${API.BASE}/${API.USERS}`);
  return { data, error, mutate };
};

/**
 * Adds a new user.
 * @param userData - The user data to be added.
 * @returns A promise that resolves to the response object.
 */
export const addUser = (userName: string): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USERS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(generateNewUser(userName))
  });

/**
 * Deletes a user.
 * @param userId - The ID of the user to be deleted.
 * @returns A promise that resolves to the response object.
 */
export const deleteUser = (userId: number): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USERS}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

/**
 * Edits a user.
 * @param userData - The updated user data.
 * @returns A promise that resolves to the response object.
 */
export const editUser = (userData: IUser): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USERS}/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

/**
 * Fetches a list of user roles.
 * @returns An object containing the list of user roles.
 */
export const getUserRoles = (): {
  data: IUserRole[];
  mutate: () => Promise<any>;
} => {
  const { data, mutate } = useApiData(`${API.BASE}/${API.USER_ROLES}`);
  return { data, mutate };
};

/**
 * Fetches a list of user rules.
 * @returns An object containing the list of user rules.
 */
export const getUserRules = (): {
  data: IUserRule[];
  mutate: () => Promise<any>;
} => {
  const { data, mutate } = useApiData(`${API.BASE}/${API.USER_RULES}`);
  return { data, mutate };
};

/**
 * Assigns a user to a role.
 *
 * @param {number} roleId - The ID of the role.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<IResponse>} - A promise that resolves to the response object.
 */
export const assignUserToRole = (
  roleId: number,
  userId: number
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USER_ROLES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      roleId: roleId,
      userId: userId
    })
  });

/**
 * Unassigns a user from a role.
 *
 * @param {number | null} roleUserId - The ID of the user-role relationship to be deleted.
 * @returns {Promise<IResponse>} - A promise that resolves to the response object.
 */
export const unAssignUserFromRole = (
  roleUserId: number | null
): Promise<IResponse> =>
  makeRequest(`${API.BASE}/${API.USER_ROLES}/${roleUserId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
