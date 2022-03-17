import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Aqui se importan los componentes que quiero usar de material
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    // Aqui se exportan los componentes que quiero usar de material
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
