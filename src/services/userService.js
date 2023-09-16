import { get, post } from "../utils/requests";

export const login = async (email, password) => {
  const result = await get(`users?email=${email}&password=${password}`);
  return result;
}

export const checkEmail = async (email) => {
  const result = await get(`users?email=${email}`);
  return result;
}

export const register = async (options) => {
  const result = await post(`users`, options);
  return result;
}




