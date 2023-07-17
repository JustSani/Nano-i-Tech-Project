import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-second-step-persona-giuridica',
  templateUrl: './second-step-persona-giuridica.component.html',
  styleUrls: ['./second-step-persona-giuridica.component.css']
})
export class SecondStepPersonaGiuridicaComponent {

  pIva: string = "";
  cap: string = ""
  @Output() selection = new EventEmitter;

  thirdStep(val: any){
    this.selection.emit(val)
  }
  save(){
    let controlliOk = true;
    if($("#txtRagione").val() == ""){
      controlliOk = false;
      $("#txtRagione").addClass('is-invalid');
      $("#txtRagione").removeClass('is-valid');
    }
    else{
      $("#txtRagione").removeClass('is-invalid');
      $("#txtRagione").addClass('is-valid');
    }


    if(this.pIva.length != 11 || isNaN(Number(this.pIva))){
      controlliOk = false;
      $("#txtPiva").addClass('is-invalid');
      $("#txtPiva").removeClass('is-valid');
    }
    else{
      $("#txtPiva").removeClass('is-invalid');
      $("#txtPiva").addClass('is-valid');
    }
    
    if(this.cap.length != 5 || isNaN(Number(this.cap))){
      controlliOk = false;
      $("#txtCap").addClass('is-invalid');
      $("#txtCap").removeClass('is-valid');
    }
    else{
      $("#txtCap").removeClass('is-invalid');
      $("#txtCap").addClass('is-valid');
    }

    
    if($("#txtSet").val() == ""){
      controlliOk = false;
      $("#txtSet").addClass('is-invalid');
      $("#txtSet").removeClass('is-valid');
    }
    else{
      $("#txtSet").removeClass('is-invalid');
      $("#txtSet").addClass('is-valid');
    }

    if($("input[name='immobili']:checked").val() == undefined ){
      controlliOk = false;
      $(".immobili").addClass('is-invalid');
      $(".immobili").removeClass('is-valid');
    }
    else{
      $(".immobili").removeClass('is-invalid');
      $(".immobili").addClass('is-valid');
    }
    
    if(controlliOk){
      this.thirdStep({pagina: 3});
    }
  }
}
