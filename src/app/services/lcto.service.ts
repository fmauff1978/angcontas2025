import { Timestamp } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, increment, query, where } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';



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

    debitar (id, valor) {

			const docRef = doc(this.firestore, "contas2025", id);
			updateDoc(docRef, ({saldo: increment(valor)}));
      updateDoc(docRef, ({atualizado_em: Timestamp.now()}));
      console.log(id, valor)
		}

    creditar (id, valor) {

			const docRef = doc(this.firestore, "contas2025", id);
			updateDoc(docRef, ({saldo: increment((-1)*valor)}));
      updateDoc(docRef, ({atualizado_em: Timestamp.now()}));
      console.log(id, valor)
		}











      async oneItem(id) {

        const fonte = collection(this.firestore, 'contas2025');
        const fonte2 = query(
          fonte,
          where('id', '==', id));
        const qs = await getDocs(fonte2);
        return qs.docs.map((x) => ({ id: x.id, ...x.data() }));
      }



}
