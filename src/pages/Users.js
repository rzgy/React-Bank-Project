import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllUsers } from "../api/auth";
import { me } from "../api/auth";
import Modal from "./Modal";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  const openModal = (username) => {
    setSelectedUsername(username);
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen h-screen flex items-center justify-center absolute inset-0 z-[-1]">
        <div className="max-w-[90%] overflow-scroll w-full px-6 py-8 bg-gray-800 rounded-md shadow-md max-h-[80%]">
          <h2 className="text-3xl text-white font-semibold mb-6">Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users?.map((user) => (
              <div
                key={user.id}
                className="bg-grey-700 p-6 rounded-md flex flex-col items-center justify-center"
              >
                <div className="card w-96 glass">
                  <figure>
                    <img
                      src={
                        "https://react-bank-project.eapi.joincoded.com/" +
                        user.image
                      }
                      alt="user!"
                      className="w-full h-[200px] object-cover mx-auto"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-cyan-50">{user.username}</h2>
                    <h2 className="text-cyan-50">Balance is: {user.balance}</h2>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          document
                            .getElementById("my_modal_3")
                            .showModal(user.username)
                        }
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        recipientUsername={selectedUsername} // Pass the selected username to the Modal
      />
    </>
  );
};

export default Users;
