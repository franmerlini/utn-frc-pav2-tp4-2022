import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloFamiliaComponent } from './components/articulo-familia/articulo-familia.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { InicioComponent } from './shared/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'articulos-familias', component: ArticuloFamiliaComponent },
  { path: 'articulos', component: ArticuloComponent },
  { path: '**', redirectTo: '/inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
