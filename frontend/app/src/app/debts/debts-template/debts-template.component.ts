import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Debt, DebtFilter, Debtor } from '../debts.model';
import { DebtsService } from '../debts.service';
import { MessageService } from 'primeng/api';
import { City } from '../../shared/models/city.model';
import moment from 'moment';

interface MonthSet { [key:string]:any }

@Component({
  selector: 'app-debts-template',
  templateUrl: './debts-template.component.html',
  styleUrl: './debts-template.component.scss'
})
export class DebtsTemplateComponent {

  debtor: Debtor;
  months: MonthSet = {
    "01": "Январь", "02": "Февраль", "03": "Март", "04": "Апрель", "05": "Май", "06": "Июнь", 
    "07": "Июль", "08": "Август", "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь", "12": "Декабрь",
  }

  debts: Debt[] = [] ;
  summ_debt: number = 0;
  loading: Boolean = true;
  filter: DebtFilter;
  city: City;
  today: string;

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private debtsService: DebtsService,
    private messageService: MessageService,
  )
  { 
    this.debtor = this.config.data.debtor;
    this.filter = this.config.data.filter;
    this.city = this.config.data.city;
    this.today = moment(new Date()).format("DD.MM.YYYY")
  }


  ngOnInit(): void {
      this.debtsService.getDebts(
                                this.debtor.id.toString(), 
                                this.city.value, 
                                this.filter)
        .subscribe({
          next: (res) => {
            this.debts = res as Debt[];

            let last_debt = this.debts.at(-1);
            if (last_debt){
              this.summ_debt = last_debt.sitog || 0;
            }
            this.loading = false; 
          },
          error: err => {
            this.messageService.add({
              severity: 'error', life: 10000, summary: "Ошибка",
              detail: "Не удалось загрузить данные."
            })
            this.loading = false;
            this.dialogRef.close();
          }
        });
  }

  formatMonthYear(date_string: string){
    let month: string = this.months[date_string.slice(5,7)];
    let year: string = date_string.slice(0,4);
    return month + " " + year;
  }

  printComponent(cmpName:string) {
    window.print()
  }
}
