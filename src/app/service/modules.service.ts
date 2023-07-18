
import { Injectable } from '@angular/core';
import {ConnectionService} from "./connection.service";

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  dataModules: any[] = [];
  res: any;
  constructor(private connectionService: ConnectionService) { }

  postModule(data: any){
    this.connectionService.sendPostRequest("/insert", data).subscribe(
      (serverData: any)=>{
        this.res = serverData;
        console.log("Done");
      },
      (error: any)=>{
        console.log("Errore Get Spedizioni");
        console.log(error);
      }
    );
  }

  getModules(){
    this.connectionService.sendGetRequest("/show").subscribe(
      (serverData: any)=>{
        this.dataModules=serverData;
        console.log("Server Data:");
        console.log(this.dataModules);
      },
      (error: any)=>{
        console.log("Errore Get Spedizioni");
        console.log(error);
      }
    );
  }
}

