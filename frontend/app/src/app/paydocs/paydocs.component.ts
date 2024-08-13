import { Component, OnInit } from '@angular/core';
import { FilterMetadata, MessageService } from 'primeng/api';
import { Paydoc, PaydocFilter } from './paydoc.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { PaydocTemplateComponent } from './paydoc-template/paydoc-template.component';
import { City } from '../shared/models/city.model';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { PaydocService } from './paydoc.service';

@Component({
  selector: 'app-paydocs',
  templateUrl: './paydocs.component.html',
  styleUrl: './paydocs.component.scss'
})
export class PaydocsComponent implements OnInit {

  paymentDocuments: Paydoc[] = [] ;
  cities: City[] = [];
  currentCity?: City;
  loading: Boolean = true;
  page: number = 1;
  page_size: number = 7;
  total: number = 0;
  filter_params: FilterMetadata = {};

  filters: { [key in keyof PaydocFilter]: FilterMetadata } = {
    gorod: { value: "", matchMode: "equals" },
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
    let storedCity = localStorage.getItem('paydocs-city-name')
    if (storedCity) {
      this.filters.gorod.value = storedCity;
      this.currentCity = { name: storedCity } as City;
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

  }

  ngOnInit() {
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
      data: obj
    });
  }
}
