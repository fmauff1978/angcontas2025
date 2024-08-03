import { ListalctosComponent } from './pages/lancamentos/listalctos/listalctos.component';
import { CadastralctosComponent } from './pages/lancamentos/cadastralctos/cadastralctos.component';
import { ListaparcelamentosComponent } from './pages/parcelamentos/listaparcelamentos/listaparcelamentos.component';
import { CadastrarcontasComponent } from './pages/cadastrarcontas/cadastrarcontas.component';
import { ListacontasComponent } from './pages/listacontas/listacontas.component';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router'
import { CadastrarparcelamentosComponent } from './pages/parcelamentos/cadastrarparcelamentos/cadastrarparcelamentos.component';

export const routes: Routes = [

  {
    path: 'contas',
 component: ListacontasComponent
 },

  {
   path: '',
    component: ListacontasComponent
 },

 {
  path: 'cadastrarcontas',
   component: CadastrarcontasComponent
},
{
  path: 'cadastrarparc',
   component: CadastrarparcelamentosComponent
},

{
  path: 'listarparc',
   component: ListaparcelamentosComponent
},

{
  path: 'cadastralcto',
   component: CadastralctosComponent
},

{
  path: 'lctos',
   component: ListalctosComponent
},





];
