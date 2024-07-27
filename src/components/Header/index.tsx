import * as Dialog from "@radix-ui/react-dialog";

import * as S from "./styles";

import Logo from "../../assets/logo.svg";
import { NewTransactionModal } from "../NewTransactionsModal";

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={Logo} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}
