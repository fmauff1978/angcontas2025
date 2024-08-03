import { ContasService } from './../../services/contas.service';
import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../../shared/container/container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  collection,
  collectionData,
  Firestore,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

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
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './cadastrarcontas.component.html',
  styleUrl: './cadastrarcontas.component.css',
})
export class CadastrarcontasComponent implements OnInit {
  
  private firestore = inject(Firestore);
  meuForm: FormGroup;
  cod2: number;


  constructor(private fb: FormBuilder, private cs: ContasService) {
    this.iniciarmeuForm();
  }

  ngOnInit(): void {
    this.cs.pegarCod();
    this.cs.value$.subscribe((value) => {
      this.cod2 = value;
    });
  }

  iniciarmeuForm() {
    this.meuForm = new FormGroup({
      conta: new FormControl('', Validators.required),
      natureza: new FormControl('', Validators.required),
      enquadramento: new FormControl('', Validators.required),
      mod_despesa: new FormControl(''),
      saldo: new FormControl(''),
    });
  }

  ResetForm() {
    this.meuForm.reset();
    console.log("formulario resetado");

  }

  onSubmit() {
    const contagravar = {
      ativa: true,
      conta: this.meuForm.value.conta,
      natureza: this.meuForm.value.natureza,
      enquadramento: this.meuForm.value.enquadramento,
      mod_despesa: this.meuForm.value.mod_despesa,
      saldo: this.meuForm.value.saldo,
      cod: this.cod2,
      criada_em: Timestamp.now(),
    };

    console.log(contagravar);

    this.cs.gravarConta(contagravar, this.cod2);
    this.ResetForm();
  }

  //funcao para pegar maior valor dentro de um array de objetos
  // const ha = this.pos.reduce(function(a,b){
  //   return (a.cod > b.cod) ? a: b
  //})
  //objeto com o maior COD
  // console.log(ha)

  //isolar COD do objeto
  //this.maiorcod= ha.cod
  //console.log(this.maiorcod);

  //criar um array de objetos com base no array de objetos raiz
  // const produto = this.pos.map(x=>({
  // 'cod ' : x.cod
  //  }))
  // console.log(this.pos);
  //console.log(produto);
}
