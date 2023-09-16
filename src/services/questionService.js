import { get } from "../utils/requests";

export const getQuestionsByTopicId = async (id) => {
  const result = await get(`questions?topicId=${id}`);
  return result;
}