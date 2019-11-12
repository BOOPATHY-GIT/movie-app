import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
    path: 'movie',
    component: MovieComponent,
    data: { title: 'Product List' }
  },
  { path: '',
    redirectTo: '/movie',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
