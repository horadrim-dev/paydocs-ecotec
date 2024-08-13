import { Component, OnInit } from '@angular/core';
import { FilterMetadata, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { City } from '../shared/models/city.model';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { DebtFilter, Debtor, DebtorFilter } from './debts.model';
import { DebtsService } from './debts.service';
import { DebtsTemplateComponent } from './debts-template/debts-template.component';
import { DebtsPeriodComponent } from './debts-period/debts-period.component';
import moment from 'moment';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent implements OnInit {

  debtors: Debtor[] = [] ;
  cities: City[] = [];
  defaultCity: City;
  currentCity: City;
  loading: Boolean = true;
  page: number = 1;
  page_size: number = 7;
  total: number = 0;
  filter_params: FilterMetadata = {};
  ref_period: DynamicDialogRef | undefined;
  ref_template: DynamicDialogRef | undefined;

  filters: { [key in keyof DebtorFilter]: FilterMetadata } = {
    gorod: { value: "", matchMode: "equals" },
    ls: { value: "", matchMode: "contains" },
    fio: { value: "", matchMode: "contains" },
    dom: { value: "", matchMode: "contains" },
  };
  debt_filter: DebtFilter = {
    min_period: { value: "" , date: undefined, text: "" },
    max_period: { value: "" , date: undefined, text: "" },
  }

  constructor(
    private debtsService: DebtsService, 
    private messageService: MessageService,
    private dialogService: DialogService,
  ){
    this.cities = [
      {name:"Прокопьевск", value:"prk"}, 
      {name:"Мыски", value:"myski"}, 
      {name: "Краснобродский", value:"krasnobrod"}, 
      {name: "Киселевск", value: "kiselevsk"}
    ];
    let storedCity = localStorage.getItem('debts-city')
    if (storedCity) {
      this.defaultCity = JSON.parse(storedCity)
    } else {
      this.defaultCity = this.cities[0];
    }
    this.filters['gorod'].value = this.defaultCity.value
    this.currentCity= this.defaultCity
  }

  ngOnInit() {
    this.fetchData();
  }

  cityChanged(event: DropdownChangeEvent){
    this.currentCity = event.value
    localStorage.setItem('debts-city', JSON.stringify(this.currentCity));
  }

  fetchData(): void {
      this.loading = true;
      this.debtsService.getDebtorsByPages(this.page, this.page_size, this.filters as FilterMetadata)
        .subscribe({
          next: (res) => {
            this.debtors = res.results as Debtor[];
            this.page_size = res.page_size;
            this.page = res.current;
            this.total = res.total;
            this.loading = false;
          },
          error: err => {
            this.messageService.add({
              severity: 'error', life: 10000, summary: "Ошибка",
              detail: "Не удалось загрузить данные."
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

      this.fetchData();
  }

  renderDocument(obj: Debtor){
    this.ref_period = this.dialogService.open(DebtsPeriodComponent, { 
      header: 'Выберите период',
      width: '850px',
      position: 'center',
    });
    this.ref_period.onClose.subscribe((data) => {
      if (!data) return;

      if(data.min_period) {
        this.debt_filter.min_period = {
          date: data.min_period,
          value: (data.min_period.getMonth() + 1).toString() + "-" + data.min_period.getFullYear(),
          text: moment(data.min_period).format("DD.MM.YYYY")
        }
      } else {
        this.debt_filter.min_period = { date: undefined, value: "", text: ""}
      }

      this.debt_filter.max_period = {
        date: data.max_period,
        value: (data.max_period.getMonth() + 1).toString() + "-" + data.max_period.getFullYear(),
        text: moment(data.max_period).format("DD.MM.YYYY")
      }

      this.ref_template = this.dialogService.open(DebtsTemplateComponent, { 
        width: '800px',
        position: 'top',
        data: {
          'debtor' : obj , 
          'filter' : this.debt_filter,
          'city' : this.currentCity,
        },
      });
    });
  }

}