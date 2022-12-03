//helpers axios
import axiosInstance from "helpers/axios";

export async function total_friend_request(username) {
  const { data } = await axiosInstance.get(
    `/users/${username}/friend_request/`
  );
  return data;
}

export async function friend_request(username, friend) {
  const { data } = await axiosInstance.post(
    `/users/friends/${username}/friend_request/`,
    {
      friend,
    }
  );
  return data;
}

export async function cancel_friend_request(username, friend) {
  const { data } = await axiosInstance.post(
    `/users/friends/${username}/cancel_friend_request/`,
    {
      friend,
    }
  );
  return data;
}

export async function accept_friend_request(username, friend) {
  const { data } = await axiosInstance.post(
    `/users/friends/${username}/accept_friend_request/`,
    {
      friend,
    }
  );
  return data;
}

export async function delete_friend(username, friend) {
  const { data } = await axiosInstance.post(
    `/users/friends/${username}/delete_friend/`,
    {
      friend,
    }
  );
  return data;
}

export async function friend_request_list(username) {
  const { data } = await axiosInstance.get(
    `/users/friends/${username}/friend_request_list/`
  );
  return data;
}

export async function friend_list(username) {
  const { data } = await axiosInstance.get(
    `/users/friends/${username}/friend_list/`
  );
  return data;
}

export async function search_friends(search) {
  const { data } = await axiosInstance.get(`/users/?search=${search}`);
  return data;
}
