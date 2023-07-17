
import { Injectable } from '@angular/core';
import {ConnectionService} from "./connection.service";

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  dataModules: any[] = [];
  constructor(private connectionService: ConnectionService) { }

  postModule(data: any){
    this.connectionService.sendPostRequest("/insert", JSON.stringify(data)).subscribe(
      (serverData: any)=>{
        console.log("Done");
      },
      (error: any)=>{
        console.log("Errore Get Spedizioni");
        console.log(error);
      }
    );
  }

  getModules(){
    this.connectionService.sendPostRequest("/show", {}).subscribe(
      (serverData: any)=>{
        this.dataModules=serverData.data;
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

