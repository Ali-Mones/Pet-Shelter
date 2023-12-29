import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageShelterComponent } from './manage-shelter/manage-shelter.component';
import { ShelterComponent } from './shelter/shelter.component';
import { ManagePetsComponent } from './manage-pets/manage-pets.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { ViewPetsComponent } from './view-pets/view-pets.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ManageShelterComponent,
    ShelterComponent,
    ManagePetsComponent,
    EditPetComponent,
    PetProfileComponent,
    ViewPetsComponent,
    PetDetailsComponent,
    FilterComponent,
    ManageApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [ { provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
