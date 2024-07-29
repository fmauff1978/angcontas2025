import { CadastrarcontasComponent } from './pages/cadastrarcontas/cadastrarcontas.component';
import { ListacontasComponent } from './pages/listacontas/listacontas.component';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [

  {
    path: 'contas',
 component: ListacontasComponent
 },
//  {
   // path: 'contas',
   // component: ListacontasComponent
//  },
  {
   path: '',
    component: ListacontasComponent
 },

 {
  path: 'cadastrarcontas',
   component: CadastrarcontasComponent
}



];
