import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: ':lang',
    component: AppComponent
  },
  {
    path: 'index',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: ':lang/index',
    redirectTo: ':lang',
    pathMatch: 'full'
  },
  {
    path: ':lang/index.html',
    redirectTo: ':lang',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
