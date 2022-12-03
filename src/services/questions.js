//helpers axios
import axiosInstance from "helpers/axios";

export async function get_questions() {
  const { data } = await axiosInstance.get(`/questions/`);
  return data;
}

export async function question_answerer(question_slug, answer) {
  const { data } = await axiosInstance.post(
    `/questions/${question_slug}/verify_answer/`,
    answer
  );
  return data;
}
