
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch/switch.component';
import { MaterialModule } from '../shared/module/material.module';
import { PersonComponent } from './person/person.component';
import { RegisterPersonComponent } from './register-person/register-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FinanceComponent } from './finance/finance.component';

@NgModule({
  declarations: [
    SwitchComponent,
    PersonComponent,
    RegisterPersonComponent,
    FinanceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    SwitchComponent
  ],
  entryComponents: [
    RegisterPersonComponent
  ]
})
export class HomeModule { }
