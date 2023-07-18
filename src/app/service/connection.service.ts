import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) { }

  private URL_SERVICE = "https://nanomodules.onrender.com";

  public sendGetRequest(endPoint: string){
    console.log(this.URL_SERVICE + endPoint);
    return this.httpClient.get(this.URL_SERVICE + endPoint);
  }

  public sendPostRequest(endPoint: string, par: any){
    console.log(this.URL_SERVICE + endPoint);
    return this.httpClient.post(this.URL_SERVICE + endPoint, par);
  }
}
