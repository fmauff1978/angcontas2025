import { Conta } from './../models/conta';
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})




export class ContasService {

  private firestore = inject(Firestore);
  contas: any={};
  pos: any;

  constructor() { }




  async getContas(){

   
  }

}



