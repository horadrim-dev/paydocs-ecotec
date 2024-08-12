import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { catchError, filter, Observable, throwError } from "rxjs";
import { EnvironmentService } from "../shared/services/environment.service";
import { Paydoc } from "../paydocs/paydoc.model";
import { Page } from "../shared/models/page.model";
import { HttpParams } from "@angular/common/http";
import { FilterMetadata } from "primeng/api";
import { City } from "../shared/models/city.model";
import { Debt, DebtFilter } from "./debts.model";

@Injectable({
    providedIn: 'root'
})
export class DebtsService {

    constructor(
        private _api: ApiService,
        private _env: EnvironmentService
    ) {
    }
    getDebtorsByPages(page: number, page_size: number, filter_params: FilterMetadata): Observable<any> {

        let params = new HttpParams()
            .set('page', page.toString())
            .set('page_size', page_size.toString());

        for (const [key, value] of Object.entries(filter_params)) {
            if (value.value !== null) {
                params = params.set(key, value.value);
            }
        }

        return this._api.get<any>(this._env.debtorsUrl, { params });
    }

    getDebts(debtor_id: string, gorod: string, filter: DebtFilter): Observable<any> {

        let params = new HttpParams()
            .set('gorod', gorod)

        for (const [key, value] of Object.entries(filter)) {
            params = params.set(key, value.value);
        }

        return this._api.get<any>(
            this._env.debtorsUrl + "/" + debtor_id + "/debts",
            { params }
        );
    }
}
