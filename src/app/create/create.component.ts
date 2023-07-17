import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
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
      this.secondFormData = JSON.stringify($event.data)
      alert("inviamo sto documento")
    }
  }
}
