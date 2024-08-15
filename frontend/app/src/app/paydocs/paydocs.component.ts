import { Component, OnInit } from '@angular/core';
import { FilterMetadata, MessageService } from 'primeng/api';
import { Paydoc, PaydocFilter, PaydocSettings } from './paydoc.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { PaydocTemplateComponent } from './paydoc-template/paydoc-template.component';
import { City } from '../shared/models/city.model';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { PaydocService } from './paydoc.service';
import { CalendarMonthChangeEvent } from 'primeng/calendar';

interface MonthSet { [key:string]:any }

@Component({
  selector: 'app-paydocs',
  templateUrl: './paydocs.component.html',
  styleUrl: './paydocs.component.scss'
})
export class PaydocsComponent implements OnInit {

  paymentDocuments: Paydoc[] = [] ;
  cities: City[] = [];
  currentCity?: City;
  settings?: PaydocSettings;
  loading: Boolean = true;
  page: number = 1;
  page_size: number = 7;
  total: number = 0;
  filter_params: FilterMetadata = {};
  period_model?: Date ;
  today: Date ;

  months: MonthSet = {
    "01": "Январь", "02": "Февраль", "03": "Март", "04": "Апрель", "05": "Май", "06": "Июнь", 
    "07": "Июль", "08": "Август", "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь", "12": "Декабрь",
  }

  filters: { [key in keyof PaydocFilter]: FilterMetadata } = {
    gorod: { value: "", matchMode: "equals" },
    period: { value: "", matchMode: "equals" },
    ls: { value: "", matchMode: "contains" },
    fio: { value: "", matchMode: "contains" },
    ad: { value: "", matchMode: "contains" },
  };
  ref: DynamicDialogRef | undefined;

  constructor(
    private paydocService: PaydocService, 
    private messageService: MessageService,
    private dialogService: DialogService,
  ){
    this.today = new Date();

    let storedCity = localStorage.getItem('paydocs-city-name')
    if (storedCity) {
      this.filters.gorod.value = storedCity;
      this.currentCity = { name: storedCity } as City;
    }

    let storedPeriod = localStorage.getItem('paydocs-period')
    if (storedPeriod) {
      this.period_model = new Date(storedPeriod);
      this.setPeriodFilterWith(this.period_model);
    }

    this.paydocService.getCities()
      .subscribe({
        next: (res) => {
          this.cities = res
          
          // this.currentCity = this.cities.find(i => i.name === storedCity);
        },
        error: err => {
          this.messageService.add({
            severity: 'error', life: 10000, summary: "Сервер недоступен",
            detail: "Не удалось загрузить список городов."
          })
          this.loading = false;
        }
      });
    this.paydocService.getSettings()
      .subscribe({
        next: (res) => {
          this.settings = res
        },
      });

  }

  ngOnInit() {
    this.fetchData();
  }

  formatMonthYear(date_string: string){
    let month: string = this.months[date_string.slice(4)];
    let year: string = date_string.slice(0,4);
    return month + " " + year;
  }

  setPeriodFilterWith(date:Date) : void {
    this.filters.period.value = date.getFullYear() + "" + date.toLocaleDateString("ru-RU", {month: "2-digit"});
  }

  periodChanged(date: Date){
    if (date){
      this.setPeriodFilterWith(date);
      localStorage.setItem('paydocs-period', date.toString());
    } else {
      this.filters.period.value = "";
      localStorage.setItem('paydocs-period', "");
    }
    this.fetchData();
  }

  cityChanged(event: DropdownChangeEvent){
    localStorage.setItem('paydocs-city-name', event.value?.name || "");
  }

  fetchData(): void {
      this.loading = true;
      this.paydocService.getPaginatedPaymentDocuments(this.page, this.page_size, this.filters as FilterMetadata)
        .subscribe({
          next: (res) => {
            this.paymentDocuments = res.results as Paydoc[];
            this.page_size = res.page_size;
            this.page = res.current;
            this.total = res.total;
            this.loading = false;
          },
          error: err => {
            this.messageService.add({
              severity: 'error', life: 10000, summary: "Сервер недоступен",
              detail: "Не удалось загрузить список."
            })
            this.loading = false;
          }
        });
  }
  loadData(event: TableLazyLoadEvent) {
      if ((event.first !== undefined) && (event.rows !== undefined) && (event.rows !== null)) {
        this.page = event.first / event.rows + 1;
        this.page_size = event.rows
      } else {
        this.page = 1;
      }
      // this.filter_params = event.filters as FilterMetadata

      this.fetchData();
  }

  renderDocument(obj: Paydoc){
    this.ref = this.dialogService.open(PaydocTemplateComponent, { 
      width: '800px',
      data: {
        paydoc_data: obj,
        settings: this.settings,
      }
    });
  }
}
