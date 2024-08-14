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
  itogo = {
    'nacis' : 0,
    'korekt': 0,
    'pen': 0,
    'dolgsud': 0,
    'opl': 0,
    'sitog': 0,
    'ish_saldo': 0
  }

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
            this.calcItogo();
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

  // calcSaldo(){
  //   this.debts.forEach(debt => {
  //     debt.ish_saldo = 
  //   });
  // }
  calcItogo() {
    this.debts.forEach(debt => {
      this.itogo.nacis += debt.nacis || 0;
      this.itogo.korekt += debt.korekt || 0;
      this.itogo.opl += debt.opl|| 0
      this.itogo.pen += debt.pen || 0;
      this.itogo.dolgsud += debt.dolgsud|| 0;
      this.itogo.ish_saldo += debt.sitog || 0;

      debt.ish_saldo = this.itogo.ish_saldo || 0;
    });

    // let last_debt = this.debts.at(-1);
    // if (last_debt){
      this.summ_debt = this.itogo.ish_saldo;
    // }
  }

  formatNum(value:number | null) {
    if (value === null) value = 0;
    return (Math.round(value * 100) / 100).toFixed(2);
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
