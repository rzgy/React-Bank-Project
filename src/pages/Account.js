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
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
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
