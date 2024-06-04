import React, { useState } from "react";
import { me } from "../api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { update } from "../api/auth";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["update"],
    mutationFn: () => update(userInfo),
    onSuccess: () => {},
  });
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["profile"] });

  return (
    <div className=" min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={`https://react-bank-project.eapi.joincoded.com/${data?.image}`}
            alt="profile"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{data?.username}</h2>
          <h2 className="card-title">Balance: {data?.balance}</h2>
          <p>extra info</p>
          <div className="card-actions">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button className="w-full btn btn-primary" onClick={mutate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
