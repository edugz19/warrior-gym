import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { BadgeModule } from 'primeng/badge';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SupportComponent } from './support/support.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    UsuariosComponent,
    NewComponent,
    EditComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,

    FormsModule,

    CardModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule,
    DialogModule,
    ConfirmPopupModule,
    ChartModule,
    BadgeModule,
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    DashboardComponent,
    LoginComponent,
    UsuariosComponent,
    NewComponent,
    EditComponent,
    SupportComponent
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ComponentsModule { }
