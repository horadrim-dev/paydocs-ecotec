import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DebtsRoutingModule } from './debts-routing.module';
import { DebtsComponent } from './debts.component';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { MatIcon } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DebtsTemplateComponent } from './debts-template/debts-template.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DebtsPeriodComponent } from './debts-period/debts-period.component';
import { CalendarModule } from 'primeng/calendar';
import { AutoFocusModule } from 'primeng/autofocus';

@NgModule({
  declarations: [
    DebtsComponent,
    DebtsTemplateComponent,
    DebtsPeriodComponent,
  ],
  imports: [
    CommonModule,
    DebtsRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    InputTextModule,
    DynamicDialogModule,
    PasswordModule,
    ConfirmDialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    TableModule,
    ProgressBarModule,
    MatIcon,
    QRCodeModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    CalendarModule,
    AutoFocusModule,
  ]
})
export class DebtsModule { }
