import { Component, inject } from '@angular/core';
import { collectionData, deleteDoc, Firestore } from '@angular/fire/firestore';
import { getFirestore, collection, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-firebase',
  standalone: true,
  imports: [],
  templateUrl: './firebase.component.html',
  styleUrl: './firebase.component.css'
})
export class FirebaseComponent {

  private firestore = inject(Firestore);

  async deletar(){

    const coll = await collection(this.firestore, 'contas');

    const q = query(
      coll,
      where('cod', '>', 179)
    );

    


  }



constructor(){




}

}
