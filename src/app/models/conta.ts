import { Timestamp } from "@angular/fire/firestore";

export interface Conta{

  id?: string,
  cod: number,
  conta: string,
  natureza: string,
  enquadramento: string,
  mod_despesa?: string,
  saldo: number,
  gd?: number,
  gd2024? :number,
  criada_em: Timestamp


}
