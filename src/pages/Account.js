import React, { useState } from "react";
import { deposit } from "../api/auth";

const Account = () => {
  const [Amount, setAmount] = useState({});

  const { mutate } = {
    mutationKey: ["Deposit"],
    mutationFn: () => deposit(Amount),
  };

  return (
    <div className=" min-h-screen flex items-center justify-center absolute inset-0 gap-10">
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Your available Balance:</h2>
          <p>KWD</p>
        </div>
      </div>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Amount</h2>
          <input
            type="Amount"
            placeholder="Amount"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <div className="card-actions justify-end">
            <button onClick={mutate} className="btn btn-primary">
              Deposit
            </button>
            <button className="btn btn-ghost">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
