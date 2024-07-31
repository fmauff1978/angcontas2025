import { Conta } from './../models/conta';
import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  limit,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { addDoc, DocumentReference, getDocs } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})



export class ContasService {

  private firestore = inject(Firestore);
  private valueSubject = new BehaviorSubject<number>(0);
  value$ = this.valueSubject.asObservable();
  private fonte = collection(this.firestore, 'contas');
  dataStream: any = {};


  constructor() {}


  async getAllItems() {
    const qs = await getDocs(this.fonte);
    return qs.docs.map((x) => ({ id: x.id, ...x.data() }));
  }



  pegarCod(){

   
    const q =  query(      this.fonte,      where('ativa', '==', true),      orderBy('cod', 'desc'),      limit(1)    );
    const dataStream = collectionData(q);
    dataStream.subscribe((data) => {

      const dados = data.map(function (e) {
        return e.cod;
      });

      const ab = dados[0]+1;
      this.valueSubject.next(ab);


     })

  }

  gravarConta(conta, cod){

    const coll =  collection(this.firestore, 'contas');
    addDoc(coll, conta).then(docRef=>{
      console.log('Conta criada com o ID:', docRef.id);

    })
    .catch(error => {
      console.error('Error adding document:', error);
    });

  }



}
