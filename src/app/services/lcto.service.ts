import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class LctoService {

  private firestore = inject(Firestore);



  constructor() { }

  gravarLcto(lcto){

    const coll =  collection(this.firestore, 'lancamentos2025');
    addDoc(coll, lcto).then(docRef=>{
      console.log('Lançamento criado com o ID:', docRef.id);

    })
    .catch(error => {
      console.error('Error adding document:', error);
    });

  }


}
