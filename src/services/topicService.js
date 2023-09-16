import { get } from "../utils/requests"

export const getAllTopic = async () => {
  const result = await get("topics");
  return result;
}
export const getTopicByTopicId = async (id) => {
  const result = await get(`topics/${id}`);
  return result;
}