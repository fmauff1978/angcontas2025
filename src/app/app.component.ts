import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./shared/toolbar/toolbar.component";
import { ListacontasComponent } from './pages/listacontas/listacontas.component';
import { ContainerComponent } from './shared/container/container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, ListacontasComponent, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angcontas2025';
}
