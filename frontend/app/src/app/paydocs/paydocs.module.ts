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
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { MatIcon } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaydocsComponent } from './paydocs.component';
import { PaydocsRoutingModule } from './paydocs-routing.module';
import { PaydocTemplateComponent } from './paydoc-template/paydoc-template.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    PaydocsComponent,
    PaydocTemplateComponent,
  ],
  imports: [
    CommonModule,
    PaydocsRoutingModule,
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
    CalendarModule,
  ]
})
export class PaydocsModule { }
