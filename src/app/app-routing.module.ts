import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'staff',component:StaffManagementComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
