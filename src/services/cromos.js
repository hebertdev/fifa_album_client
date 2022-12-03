//helpers axios
import axiosInstance from "helpers/axios";

export async function getCromos(username) {
  const { data } = await axiosInstance.get(`/users/${username}/stickers/`);
  return data;
}

export async function getUserCromos(username) {
  if (username) {
    const { data } = await axiosInstance.get(
      `/users/${username}/stickers/my_stickers/`
    );
    return data;
  }
  return null;
}

export async function pickedSticker({ username, slug }) {
  const { data } = await axiosInstance.patch(
    `/users/${username}/stickers/${slug}/picked_sticker/`
  );
  return data;
}

export async function unpickedSticker({ username, slug }) {
  const { data } = await axiosInstance.patch(
    `/users/${username}/stickers/${slug}/unpicked_sticker/`
  );
  return data;
}
