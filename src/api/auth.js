import React from "react";
import instance from ".";

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );
  storeToken(data.token);
  return data;
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export { register, storeToken };
