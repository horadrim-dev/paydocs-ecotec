import { Injectable } from "@angular/core";
import { catchError, filter, Observable, throwError } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { FilterMetadata } from "primeng/api";
import { ApiService } from "../shared/services/api.service";
import { EnvironmentService } from "../shared/services/environment.service";
import { City } from "../shared/models/city.model";

@Injectable({
  providedIn: 'root'
})
export class PaydocService {

    constructor(
        private _api: ApiService, 
        private _env: EnvironmentService
    ){
    }
    // getPaymentDocuments() : Observable<Page> {
    //     return this._api.get<any>(this._env.paymentDocumentsUrl);
    // }
    getPaginatedPaymentDocuments(page: number, page_size: number, filter_params:FilterMetadata ): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('page_size', page_size.toString());

        for (const [key, value] of Object.entries( filter_params)) {
            if (value.value !== null) {
                params = params.set(key, value.value);
            }
        }

        return this._api.get<any>(this._env.paymentDocumentsUrl, { params });
    }
    
    getCities(): Observable<City[]> {
        return this._api.get<any>(this._env.paymentDocumentsCityListUrl);
    }
}
