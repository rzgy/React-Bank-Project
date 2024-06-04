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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
    ?.filter((transaction) => {
      const transactionDate = days(transaction.createdAt).format("L");
      const formattedStartDate = startDate ? days(startDate).format("L") : "";
      const formattedEndDate = endDate ? days(endDate).format("L") : "";

      const isAfterStartDate =
        formattedStartDate === "" || transactionDate >= formattedStartDate;
      const isBeforeEndDate =
        formattedEndDate === "" || transactionDate <= formattedEndDate;

      return isAfterStartDate && isBeforeEndDate;
    })
    ?.filter((transaction) => transaction.type.toString().includes(filter))
    .map((transaction, index) => (
      <tr
        style={{
          color: transaction.type === "deposit" ? "green" : "red",
        }}
        key={index}
      >
        <th>{index + 1}</th>
        <td>
          {transaction.type === "deposit"
            ? `+${transaction.amount}`
            : `-${transaction.amount}`}
        </td>
        <td>{days(transaction.createdAt).format("L")}</td>
        <td>{transaction.type}</td>
      </tr>
    ));
  return (
    <div>
        
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <div role="tablist" className="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Enter amount"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <input
                  id="string"
                  placeholder="Enter amount..."
                  type="string"
                  className="btn m-1"
                  onChange={(event) => setamountText(event.target.value)}
                ></input>
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Choose Date of transaction"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <div className="flex flex-col w-full lg:flex-row">
                  <input
                    id="date"
                    placeholder="Enter date..."
                    type="date"
                    className="btn m-1"
                    onChange={(event) => setdateText(event.target.value)}
                  ></input>
                  <div className="grid flex-grow h-10 card  bg-base-100 rounded-box place-items-center">
                    <input
                      id="start-date"
                      placeholder="Start date..."
                      type="date"
                      className="btn m-1"
                      onChange={(event) => setStartDate(event.target.value)}
                    />
                  </div>
                  <div className="divider lg:divider-horizontal">To</div>
                  <div className="grid flex-grow h-10 card bg-base-100 rounded-box place-items-center">
                    <input
                      id="end-date"
                      placeholder="End date..."
                      type="date"
                      className="btn m-1"
                      onChange={(event) => setEndDate(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Type of transaction"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <li>
                      <button
                        name="all"
                        value={"all"}
                        onClick={(event) => setFilter("")}
                      >
                        All
                      </button>
                    </li>
                  </div>
                  <div tabIndex={0} role="button" className="btn m-1">
                    <li>
                      <button
                        name="deposit"
                        value={"deposit"}
                        onClick={(event) => setFilter(event.target.value)}
                      >
                        Deposit
                      </button>
                    </li>
                  </div>
                  <div tabIndex={0} role="button" className="btn m-1">
                    <li>
                      <button
                        name="withdraw"
                        value={"withdraw"}
                        onClick={(event) => setFilter(event.target.value)}
                      >
                        Withdraw
                      </button>
                    </li>
                  </div>
                  <div tabIndex={0} role="button" className="btn m-1">
                    <li>
                      <button
                        name="transfer"
                        value={"transfer"}
                        onClick={(event) => setFilter(event.target.value)}
                      >
                        Transfer
                      </button>
                    </li>
                  </div>
                </div>
              </div>
            </div>
            {/* <div>
              <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow h-10 card  bg-base-100 rounded-box place-items-center">
                  <input
                    id="start-date"
                    placeholder="Start date..."
                    type="date"
                    className="btn m-1"
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </div>
                <div className="divider lg:divider-horizontal">To</div>
                <div className="grid flex-grow h-10 card bg-base-100 rounded-box place-items-center">
                  <input
                    id="end-date"
                    placeholder="End date..."
                    type="date"
                    className="btn m-1"
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
              </div>
            </div> */}
            {/* <input
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
            </div> */}
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
