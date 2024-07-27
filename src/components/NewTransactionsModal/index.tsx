import { useContextSelector } from "use-context-selector";

import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as Dialog from "@radix-ui/react-dialog";
import * as zod from "zod";

import { TransactionContext } from "../../contexts/TransactionsContext";

import * as S from "./styles";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => context.createTransaction
  );

  const { control, register, handleSubmit, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactionFormSchema),
      defaultValues: {
        type: "income",
      },
    });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    createTransaction(data);

    reset();
  }

  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <S.CloseButton>
          <X />
        </S.CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <S.TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <S.TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </S.TransactionTypeButton>

                <S.TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </S.TransactionTypeButton>
              </S.TransactionType>
            )}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </S.Content>
    </Dialog.Portal>
  );
}
