import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditNettingComponent } from './add-edit-netting/add-edit-netting.component';


const routes: Routes = [  
  { path: '',   redirectTo: '/netting-type', pathMatch: 'full' }, 
  { path: 'netting-type', component: AddEditNettingComponent },
  { path: 'netting-type/:id', component: AddEditNettingComponent },    
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
