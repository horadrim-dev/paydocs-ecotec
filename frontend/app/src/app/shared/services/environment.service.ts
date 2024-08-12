import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public urlAddress: string = environment.urlAddress;
  public jwtLogin: string = environment.jwtLogin;
  public jwtRefresh: string = environment.jwtRefresh;
  public debtorsUrl: string = environment.debtorsUrl;
  public paymentDocumentsUrl: string = environment.paymentDocumentsUrl;
  public paymentDocumentsCityListUrl: string = environment.paymentDocumentsCityListUrl;
  constructor() { }
}
