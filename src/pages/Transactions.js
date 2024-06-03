import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyTransactions, me } from "../api/auth";
import days from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

days.extend(LocalizedFormat);

const Transactions = () => {
  const { data: userData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
  });
  const [amountText, setamountText] = useState("");
  const [dateText, setdateText] = useState("");

  const [filter, setFilter] = useState("");

  const { data: transactionsData, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getMyTransactions,
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const filteredTranasctions = transactionsData
    ?.filter((transaction) =>
      transaction.amount.toString().includes(amountText)
    )
    ?.filter((transaction) =>
      days(transaction.createdAt)
        .format("L")
        .includes(dateText === "" ? "" : days(dateText).format("L"))
    )
    ?.filter((transaction) => transaction.type.toString().includes(filter))
    .map((transaction, index) => (
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{transaction.amount}</td>
        <td>{days(transaction.createdAt).format("L")}</td>
        <td>{transaction.type}</td>
      </tr>
    ));
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <input
              id="string"
              placeholder="Enter amount..."
              type="string"
              onChange={(event) => setamountText(event.target.value)}
            ></input>
            <input
              id="date"
              placeholder="Enter date..."
              type="date"
              onChange={(event) => setdateText(event.target.value)}
            ></input>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                Type of Transactions
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button
                    name="all"
                    value={"all"}
                    onClick={(event) => setFilter("")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    name="deposit"
                    value={"deposit"}
                    onClick={(event) => setFilter(event.target.value)}
                  >
                    Deposit
                  </button>
                </li>
                <li>
                  <button
                    name="withdraw"
                    value={"withdraw"}
                    onClick={(event) => setFilter(event.target.value)}
                  >
                    Withdraw
                  </button>
                </li>
              </ul>
            </div>
            <tr>
              <th></th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{filteredTranasctions}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
