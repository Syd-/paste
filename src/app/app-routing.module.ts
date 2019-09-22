import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { ExistingComponent } from './existing/existing.component';

const routes: Routes = [
  {path: '', component: NewComponent},
  {path: ':id', component: ExistingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
