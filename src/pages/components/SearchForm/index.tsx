import { useContextSelector } from "use-context-selector";

import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import * as S from "./styles";
import { TransactionContext } from "../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => context.fetchTransactions
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  );
}
