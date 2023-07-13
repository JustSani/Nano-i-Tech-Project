import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css']
})
export class SecondStepComponent {
  selectVal:string = "Codice Fiscale";
  
  contaParenti: number = 0;
  numeroParenti: number = 0;
  errore1: boolean = false;
  cap: any = "";
  codFisc: any = "";
  
  onSelected(value: any){
    this.selectVal = value;
  }
  save(){
    //$("#form").addClass("was-validated")

    let controlliOk = true;

    // controlli nucleo familiare
    let nucleoChecks = ["Coniuge", "Padre", "Madre"];
    let numeroParenti = Number($("#nParenti").val());
    
    let contaParenti = 0;
    // scorriamo tutte le checkbox e contiamo quante sono a true
    nucleoChecks.forEach(parente => {
      if($("#chk" + parente).prop('checked')){
        contaParenti++;
      }
    });
    // sommiamo il numero di figli dichiarati
    contaParenti += Number($("#nFigli").val())

    if(contaParenti != numeroParenti){
      this.errore1 = true
      $("#nParenti").addClass("custom-input-error")
      controlliOk = false;
    }

    this.contaParenti = contaParenti;
    this.numeroParenti = numeroParenti;


    // controllo input non vuoti
    let checkVuoti = ["Cognome", "Cap", "Nome"]
    checkVuoti.forEach(nome => {
      if($("#txt" + nome).val() == 0){
        $("#txt" + nome).addClass("is-invalid")
        controlliOk = false;
      }
      else{
        $("#txt" + nome).removeClass("is-invalid")
        $("#txt" + nome).addClass("is-valid")
      }
      
    });

    //controllo CAP (SOLO LUNGHEZZA E CHE CONTENGA NUMERI)
    let CAP = $("#txtCap");
    if(this.cap.length != 5 || isNaN(this.cap)){
      CAP.removeClass("is-valid")
      CAP.addClass("is-invalid")
      controlliOk = false;
    }
    else{
      CAP.removeClass("is-invalid")
      CAP.addClass("is-valid")
    }

    //Controlli metodo di riconoscimento
    let toCheck = [""];
    switch(this.selectVal){
      case "Codice Fiscale":

        if(this.checkValueNotNull("txtCodFisc")){

          //controllo regex codice fiscale
          if(!/^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i
          .test(this.codFisc)){
            controlliOk = false;
            $("#txtCodFisc").removeClass("is-valid");
            $("#txtCodFisc").addClass("is-invalid");
          }
          
        }
        else{
          controlliOk = false;
        }

        break;
      case "P.IVA":
        if(this.checkValueNotNull("txtPiva")){
          
        }
        else{
          controlliOk = false;
        }
        
        
        break;
      case "Luogo e Data di Nascita":

        if(!this.checkValueNotNull("txtLuogo")){
          controlliOk = false;
        }

        if(this.checkValueNotNull("dtNascita")){
          controlliOk = false;
        }
        
        break;

    }
  }
  checkValueNotNull(par: string){
    if($("#" + par).val() == ""){
      
      $("#" + par).removeClass("is-valid");
      $("#" + par).addClass("is-invalid");
      return false;
    }else{
      $("#" + par).removeClass("is-invalid");
      $("#" + par).addClass("is-valid");
      return true;
    }
  }
  chkFigli(){
    if($("#chkFigli").prop("checked")){
      $("#nFigli").attr("min", "1")
      $("#nFigli").val(1);
      $("#nFigli").removeAttr('disabled');
    }
    else{
      $("#nFigli").val(0);      
      $("#nFigli").prop("disabled","true")
    }
    
  }
}
