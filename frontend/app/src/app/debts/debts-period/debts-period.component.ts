import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-debts-period',
  templateUrl: './debts-period.component.html',
  styleUrl: './debts-period.component.scss'
})
export class DebtsPeriodComponent implements OnInit{

  min_period: Date | undefined;
  max_period: Date ;
  today: Date;
  constructor(
    private dialogRef: DynamicDialogRef,
  ){
    this.today = new Date();
    this.max_period = this.today;
  }

  ngOnInit(): void {
    let storedMinPeriod = localStorage.getItem('debts-min-period')
    if (storedMinPeriod) this.min_period = new Date(storedMinPeriod)
  }

  finish(){
    if (this.min_period) {
      localStorage.setItem('debts-min-period', this.min_period.toString());
      
      if (this.min_period > this.today) {
        this.min_period = this.today;
      }
    } else {
      localStorage.setItem('debts-min-period', "");
    }

    if (this.max_period > this.today) {
      this.max_period = this.today;
    }

    this.dialogRef.close({
      min_period : this.min_period,
      max_period : this.max_period
    });
  }
}
