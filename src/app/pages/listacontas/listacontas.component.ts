import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AfterViewInit,
  Component,
  inject,
  LOCALE_ID,
  ViewChild,
} from '@angular/core';

import { Conta } from '../../models/conta';
import { collection, query } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import {
  collectionData,
  Firestore,
  orderBy,
  where,
} from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listacontas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    CommonModule,
  ],
  templateUrl: './listacontas.component.html',
  styleUrl: './listacontas.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ListacontasComponent  {

  private firestore = inject(Firestore);

  displayedColumns: string[] = [
    'demo-position',
    'conta',
    'natureza',
    'saldo',
    'enquadramento',
    'mod_despesa',
    'cod',
  ];

  dataSource: MatTableDataSource<Conta>;
  totalparcelas: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor() {
    const coll = collection(this.firestore, 'contas');
    const q = query(
      coll,
      where('ativa', '==', true),
      orderBy('cod', 'asc')
    );


    const dataStream = collectionData(q);


    dataStream.subscribe((data) => {



      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;



      this.totalparcelas = data.reduce(function (a, b) {
        return a + b.saldo;


      }, 0);


    })


  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
