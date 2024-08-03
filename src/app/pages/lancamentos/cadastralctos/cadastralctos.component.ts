import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, numberAttribute, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LctoService } from '../../../services/lcto.service';

@Component({
  selector: 'app-cadastralctos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbar,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cadastralctos.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './cadastralctos.component.css',
})
export class CadastralctosComponent implements OnInit{


  private firestore = inject(Firestore);
  private fonte = collection(this.firestore, 'contas2025');
  private fonte2 = query(
    this.fonte,
    where('em_uso', '==', true),
    orderBy('conta', 'asc')
  );

  meuForm: FormGroup;
  dados: any = {};
  startDate = new Date();
  selected: any;
  selected2: any;

  constructor(private fb: FormBuilder, private cs: LctoService) {

  }

  async getAllItems() {
    const qs = await getDocs(this.fonte2);
    return qs.docs.map((x) => ({ id: x.id, ...x.data() }));
  }

  iniciarmeuForm() {
    this.meuForm = new FormGroup({
      data:  new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      ctadebitada: new FormControl('', Validators.required),
      ctacreditada: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
    });
  }

  ResetForm() {
    this.meuForm.reset();
  }


  ngOnInit(){


    this.dados = this.getAllItems();
    console.log(this.dados);
    this.iniciarmeuForm();

  }

  onSubmit() {

    let split_deb  = this.selected.split('-');
    let split_cred = this.selected2.split('-');

    const contadeb_id = split_deb[0]
    const   cod_deb0 = split_deb[1]
    const cod_deb = Number(cod_deb0)
    const   contadeb = split_deb[2]
    const   naturezadeb = split_deb[3]
    const   enquadramentodeb = split_deb[4]
    const   mod_despesa_deb= split_deb[5]

    const contacred_id = split_cred[0]
    const   cod_cred0= split_cred[1]
    const cod_cred = Number(cod_cred0)
    const   contacred = split_cred[2]
    const   naturezacred = split_cred[3]
    const   enquadramentocred = split_cred[4]
    const   mod_despesa_cred= split_cred[5]



    const lctogravar = {

      datalcto : this.meuForm.value.data,
      descricao: this.meuForm.value.descricao,
      reg : `${Date.now()}`,
      contadebitada: {id: contadeb_id,
        cod:  cod_deb,
        conta: contadeb,
        natureza: naturezadeb,
        enquadramento: enquadramentodeb,
        mod_despesa: mod_despesa_deb},
      contacreditada: {id: contacred_id,
          cod: cod_cred,
          conta: contacred,
          natureza: naturezacred,
          enquadramento: enquadramentocred,
          mod_despesa: mod_despesa_cred},
          valor: this.meuForm.value.valor,
         criado_em: Timestamp.now()
    }


      this.cs.gravarLcto(lctogravar)
      const valor = this.meuForm.value.valor
      this.cs.debitar(contadeb_id,valor)
      this.cs.creditar(contacred_id, valor)
      this.ResetForm()

  }






}
