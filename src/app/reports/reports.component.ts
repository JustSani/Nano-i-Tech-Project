import { Component } from '@angular/core';
import {ModulesService} from "../service/modules.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  constructor(public modulesService:ModulesService) {  }
  hide: boolean = false;
  modulo: any;

  ngOnInit(){
    this.modulesService.getModules();
  }
  keysCleaned(par: any){
    let obj = Object.keys(par)
    let nuovo = new Array()
    obj.forEach(element => {
      //pulizia dell array
      if((!element.includes("per") || element.includes("patrimonio per") ))
        nuovo.push(element)
    });
    return nuovo;

  }
  keys(par: any){
    return  Object.keys(par);
  }
  getAssicurazioni(par : any){
    let obj = Object.keys(par)
    let checked = [];
    
    for(let i = 0; i < obj.length; i++){
      if(par[obj[i]])
        checked.push(obj[i])
    }

    return checked;
    
  }
  show(par: any){
    this.hide = true;
    this.modulo = par;
  }
}
