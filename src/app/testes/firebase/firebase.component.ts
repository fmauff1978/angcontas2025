import { Component } from '@angular/core';
import { getFirestore, collection, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-firebase',
  standalone: true,
  imports: [],
  templateUrl: './firebase.component.html',
  styleUrl: './firebase.component.css'
})
export class FirebaseComponent {

constructor(){

  const db = getFirestore();

  
}

}
