import React, { useState } from "react";
import { Deposit, Withdraw, getBalance, me } from "../api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

const Account = () => {
  const [Amount, setAmount] = useState({});

  const { mutate: deposit } = useMutation({
    mutationKey: ["Deposit"],
    mutationFn: () => Deposit(Amount),
    onSuccess: (data) => {
      console.log("Deposit successful:", data);
      refetch();
    },
    onError: (error) => {
      console.error("Deposit failed:", error);
    },
  });

  const { mutate: withdraw } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: () => Withdraw(Amount),
    onSuccess: (data) => {
      console.log("withraw successful:", data);
      refetch();
    },
    onError: (error) => {
      console.error("withraw failed:", error);
    },
  });
  const { data, refetch } = useQuery({
    queryKey: ["balance"],
    queryFn: () => me(),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleDeposit = (e) => {
    e.preventDefault();
    deposit();
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    withdraw();
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-10">
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Your available Balance:</h2>
          <p>KWD {data?.balance}</p>
        </div>
      </div>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Amount</h2>
          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full max-w-xs text-slate-900"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button
              onClick={handleDeposit}
              className="btn  border-t-neutral-600"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="btn  border-t-neutral-800"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
