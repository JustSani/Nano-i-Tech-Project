import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  selection:any = 1; // 0 == step 1; 1 == step 2 Persona Fisica, ; 2 == step-2-persona-giuridica; 3 == step 3
  ButtonText:string = "Avanti"; //testo bottone

  ngOnInit(){
  }
  nextStep($event: any){ 
    // true equivale alla scelta "Persona Fisica"
    
    // false equivale alla scelta "Persona Giuridica"

    if($event){
      this.selection = 1;
    }else{
      this.selection = 2

    }
  }
  next(){ // gestione bottone per andare avanti tra le opzioni
    if(this.selection != 3){
      this.selection = 3;
      this.ButtonText = "Fine"
    }
    else if(this.selection == 3){
      //DO SOMETHINGG
      this.selection = 0;
      this.ButtonText = "Avanti"
    }
  }
}
