import React, { useState } from "react";
import { me } from "../api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { transfer } from "../api/auth";
const Modal = ({ show, setShowModal, recipientUsername }) => {
  const [amount, setAmount] = useState();
  const [username, setUsername] = useState("");

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: transferMutate } = useMutation({
    mutationKey: ["transfer"],
    mutationFn: () => transfer(amount, username),
    onSuccess: (data) => {
      console.log("transfer successful:", data);
      document.getElementById("my_modal_3").close();
    },
    onError: (error) => {
      console.error("transfer failed:", error);
    },
  });

  const handleTransfer = (e) => {
    e.preventDefault();
    transferMutate({ amount, recipientUsername });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="card-body items-center text-center">
            <h2 className="card-title">Amount</h2>
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered w-full max-w-xs text-slate-900"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="username"
              className="input input-bordered w-full max-w-xs text-slate-900"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="card-actions justify-end">
              <button
                onClick={handleTransfer}
                className="btn  border-t-neutral-600"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
