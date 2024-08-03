import { CommonModule } from '@angular/common';
import { Lcto } from './../../../models/lancamento';
import { Component, inject, ViewChild } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listalctos',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    CommonModule],
  templateUrl: './listalctos.component.html',
  styleUrl: './listalctos.component.css'
})
export class ListalctosComponent {

  private firestore = inject(Firestore);

  displayedColumns: string[] = [
    'demo-position',
    'reg',
    'datalcto',
    'descricao',
    'ctadeb',
    'ctacred',
    'valor',
  ];

  dataSource: MatTableDataSource<Lcto>;
  totalparcelas: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    const coll = collection(this.firestore, 'lancamentos2025');
    const q = query(
      coll,
      orderBy('datalcto', 'desc')
    );
    const dataStream = collectionData(q);


    dataStream.subscribe((data) => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      console.log(typeof data)


      //this.totalparcelas = data.reduce(function (a, b) {
       // return a + b.saldo;


      //}, 0);


    })


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
