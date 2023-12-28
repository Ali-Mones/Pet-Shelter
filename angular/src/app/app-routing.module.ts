import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageShelterComponent } from './manage-shelter/manage-shelter.component';
import { ManagePetsComponent } from './manage-pets/manage-pets.component';

const routes: Routes = [
  { path:'', redirectTo:'staff/manage-pets', pathMatch:'full' },
  { path:'auth/login', component: LoginComponent },
  { path:'auth/register', component: RegisterComponent },
  { path:'manager/manage-shelters', component: ManageShelterComponent },
  { path:'staff/manage-pets', component: ManagePetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
