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
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-300 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="70%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="80%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={3}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
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
