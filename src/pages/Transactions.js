import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyTransactions, me } from "../api/auth";

const Transactions = () => {
  const { data: userData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
  });

  const { data: transactionsData } = useQuery({
    queryKey: ["transactions"],
    queryFn: getMyTransactions,
  });

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
                <td>{transaction.createdAt}</td>
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
