import { Component } from '@angular/core';
import {ModulesService} from "../service/modules.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(public modulesService:ModulesService) {  }


  selection:any = 0; // 0 == step 1; 1 == step 2 Persona Fisica, ; 2 == step-2-persona-giuridica; 3 == step 3
  ButtonText:string = "Avanti"; //testo bottone
  firstFormData: any = {};
  secondFormData: any = {};
  ngOnInit(){
  }
  nextStep($event: any){ 
    
    
    if($event.pagina != 4){
      this.selection = $event.pagina;
      if($event.pagina == 3){
        this.firstFormData = JSON.stringify($event.data);
      }
    }
    else{
      this.selection = 0
      this.secondFormData = JSON.stringify({persona: this.firstFormData, assicurazione: this.secondFormData})
      
      this.modulesService.postModule($event.data)

    }
  }
}
