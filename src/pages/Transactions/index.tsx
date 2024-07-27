import { useState, useEffect } from "react";

import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "../components/SearchForm";

import * as S from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch("http://localhost:3333/transactions");
      const data = await response.json();

      setTransactions(data);
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <S.PriceHighlight variant={transaction.type}>
                  {transaction.price}
                </S.PriceHighlight>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  );
}
