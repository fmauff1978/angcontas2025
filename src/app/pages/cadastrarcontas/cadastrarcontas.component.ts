import { ContasService } from './../../services/contas.service';
import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../../shared/container/container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { collection, collectionData, Firestore, orderBy, query, Timestamp, where } from '@angular/fire/firestore';


@Component({
  selector: 'app-cadastrarcontas',
  standalone: true,
  imports: [
    ContainerComponent,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule, MatButtonModule, MatDividerModule, MatCardModule
  ],
  templateUrl: './cadastrarcontas.component.html',
  styleUrl: './cadastrarcontas.component.css',
})
export class CadastrarcontasComponent {

  private firestore = inject(Firestore);

  pos:any;
  meuForm!: FormGroup;

constructor(private fb: FormBuilder){

  this.iniciarmeuForm()

}

iniciarmeuForm(){

  this.meuForm = this.fb.group({
    conta: [' '],
    natureza: [' '],
    enquadramento: [' '],
    mod_despesa: [' '],
    saldo: [' '],
    cod: [' '],
    criadovalor: [' '],
  });
}

ResetForm() {
  this.meuForm.reset();
}


onSubmit(){
     //pegar o ultimo numero do COD no banco de dados
  const coll = collection(this.firestore, 'contas');
  const q = query(coll,where('ativa', '==', true),orderBy('natureza', 'asc'));
  const dataStream = collectionData(q);
  dataStream.subscribe((data) => {
      this.pos = data

    //funcao para pegar maior valor dentro de um array de objetos
      const ha = this.pos.reduce(function(a,b){
        return (a.cod > b.cod) ? a: b
      })
      //objeto com o maior COD
      console.log(ha)

      //isolar COD do objeto
      let maiorcod= ha.cod
      console.log(maiorcod);

//criar um array de objetos com base no array de objetos raiz
     // const produto = this.pos.map(x=>({
      // 'cod ' : x.cod
    //  }))
    // console.log(this.pos);
      //console.log(produto);

  const contagravar ={

    ativa: true,
    conta: this.meuForm.value.conta,
    natureza: this.meuForm.value.natureza,
    enquadramento: this.meuForm.value.enquadramento,
    mod_despesa: this.meuForm.value.mod_despesa,
    saldo: this.meuForm.value.saldo,
    cod: maiorcod+1,
    criado_em: Timestamp.now()
  }

  console.log(contagravar);

})

}





}
