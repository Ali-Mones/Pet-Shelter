import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageShelterComponent } from './manage-shelter/manage-shelter.component';
import { ManagePetsComponent } from './manage-pets/manage-pets.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { ViewPetsComponent } from './view-pets/view-pets.component';

const routes: Routes = [
  { path:'', redirectTo:'view-pets', pathMatch:'full' },
  { path:'auth/login', component: LoginComponent },
  { path:'auth/register', component: RegisterComponent },
  { path:'manager/manage-shelters', component: ManageShelterComponent },
  { path:'staff/manage-pets', component: ManagePetsComponent },
  { path: 'pet-profile', component: PetProfileComponent },
  { path: 'view-pets', component: ViewPetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
