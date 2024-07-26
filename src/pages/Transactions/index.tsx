import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "../components/SearchForm";

import * as S from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <S.PriceHighlight variant="income">R$ 12.000,00</S.PriceHighlight>
              <td>Venda</td>
              <td>25/07/2024</td>
            </tr>
            <tr>
              <td width="50%">Hamburguer</td>
              <S.PriceHighlight variant="outcome">- R$ 59,00</S.PriceHighlight>
              <td>Alimentação</td>
              <td>25/07/2024</td>
            </tr>
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  );
}
