import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Paydoc, PaydocSettings } from '../paydoc.model';
import html2canvas from "html2canvas";

interface MonthSet { [key:string]:any }

@Component({
  selector: 'app-paydoc-template',
  templateUrl: './paydoc-template.component.html',
  styleUrl: './paydoc-template.component.scss'
})
export class PaydocTemplateComponent implements OnInit {

  data: Paydoc;
  settings: PaydocSettings;
  months: MonthSet = {
    "01": "январь", "02": "февраль", "03": "март", "04": "апрель", "05": "май", "06": "июнь", 
    "07": "июль", "08": "август", "09": "сентябрь", "10": "октябрь", "11": "ноябрь", "12": "декабрь",
  }
  month: string;
  year: string;


  constructor(
    private config: DynamicDialogConfig,
  )
  { 
    this.data = this.config.data.paydoc_data as Paydoc;
    this.settings = this.config.data.settings as PaydocSettings;
    this.month = this.months[this.data.period.slice(4)];
    this.year = this.data.period.slice(0,4);
  }

  ngOnInit(): void {
  }

  formatNum(value:number) {
    return (Math.round(value * 100) / 100).toFixed(2);
  }

  printComponent(cmpName:string) {
    window.print()

      // let printContents = document.getElementById(cmpName) as HTMLElement;
      
      // html2canvas(printContents).then(async function(canvas:any) {
      //   let win = window.open();
      //   await win?.document.write(" \
      //     <style> \
      //     @media print { @page { size: auto; margin: 0mm; }  html { background-color: #FFFFFF; margin: 0px; } body { margin: 10mm; }} \
      //     </style> \
      //     ");
      //   await win?.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
      //   win?.print();
      //   win?.close();
      // });
  }
}
