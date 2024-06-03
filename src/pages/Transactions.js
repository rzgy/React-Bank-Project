import React from "react";
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

  const { data: transactionsData, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getMyTransactions,
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((transaction, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{transaction.amount}</td>
                <td>{days(transaction.createdAt).format("LLL")}</td>
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
