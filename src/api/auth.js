import React from "react";
import instance from ".";

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

const login = async (userInfo) => {
  const { data } = await instance.post(
    "/mini-project/api/auth/login",
    userInfo
  );
  storeToken(data.token);
  return data;
};

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
const me = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");

  return data;
};

const update = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);
  const { data } = await instance.put(
    "/mini-project/api/auth/profile",
    formData
  );

  return data;
};
const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const logout = () => {
  localStorage.removeItem("token");
};

const getMyTransactions = async () => {
  const { data } = await instance.get("/mini-project/api/transactions/my");
  return data;
};

const Deposit = async (amount) => {
  try {
    const res = await instance.put("/mini-project/api/transactions/deposit", {
      amount: amount,
    });
    return res.data;
  } catch (error) {
    console.error("Error during deposit:", error);
    throw error;
  }
};
const Withdraw = async (amount) => {
  try {
    const res = await instance.put("/mini-project/api/transactions/withdraw", {
      amount: amount,
    });
    return res.data;
  } catch (error) {
    console.error("Error during withdraw:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

export {
  register,
  storeToken,
  logout,
  checkToken,
  login,
  me,
  update,
  getMyTransactions,
  Deposit,
  Withdraw,
  getAllUsers,
};
