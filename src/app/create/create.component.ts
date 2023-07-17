import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  selection:any = 0; // 0 == step 1; 1 == step 2 Persona Fisica, ; 2 == step-2-persona-giuridica; 3 == step 3
  ButtonText:string = "Avanti"; //testo bottone

  ngOnInit(){
  }
  nextStep($event: any){ 
    
    if($event.pagina != 4)
      this.selection = $event.pagina;
    else{
      this.selection = 0
      // TO DO

      alert("inviamo sto documento")
    }
  }
}
