import { getCookie } from "../helpers/cookie";
import { get, post } from "../utils/requests"

export const getListAnswerByUser = async () => {
  const id = getCookie("id");
  const result = await get(`answers?userId=${id}`);
  return result;
}

export const getAnswerByAnswerId = async (id) => {
  const result = await get(`answers/${id}`);
  return result;
}

export const createAnswer = async (options) => {
  const result = await post(`answers`, options);
  return result;
}

