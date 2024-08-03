import { Timestamp } from "@angular/fire/firestore";

export interface Lcto{

  reg: string;
  datalcto: Timestamp;
  descricao: string;
  contadebitada : {

    cod: number,
    conta: string,
    enquadamento: string,
    id: string,
    mod_despesa: string,
    natureza: string
  };
  contacreditada : {

    cod: number,
    conta: string,
    enquadamento: string,
    id: string,
    mod_despesa: string,
    natureza: string
  };

valor: number,
criado_em: Timestamp

}
