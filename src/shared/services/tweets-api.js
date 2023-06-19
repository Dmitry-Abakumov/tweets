import axios from "axios";

const instance = axios.create({
  baseURL: "https://6404ed1540597b65de2d4b8d.mockapi.io/",
});

export const getAllTweets = async () => {
  const { data } = await instance.get("users");

  return data;
};

export const getSomeTweets = async (page, limit) => {
  const { data } = await instance.get("users", {
    params: {
      page,
      limit,
    },
  });

  return data;
};

export const updateFollowersById = async (id, body) => {
  const { data } = await instance.put(`users/${id}`, body);

  return data;
};
