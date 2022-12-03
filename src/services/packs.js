//helpers axios
import axiosInstance from "helpers/axios";

export async function openPack() {
  const { data } = await axiosInstance.post(`/stickers/open_pack/`);
  return data;
}
