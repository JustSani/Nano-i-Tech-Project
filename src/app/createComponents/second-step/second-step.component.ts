import { Component, Output, EventEmitter } from '@angular/core';
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
  pIva: any = "";
  luogo: any= "";
  nascita: any = "";

  @Output() selection = new EventEmitter;

  thirdStep(val: any){
    this.selection.emit(val)
  }

  onSelected(value: any){
    this.selectVal = value;
  }
  save(){
    //$("#form").addClass("was-validated")

    let controlliOk = true;
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

    let metodo = ""
    let valore = ""
    //Controlli metodo di riconoscimento
    switch(this.selectVal){
      case "Codice Fiscale":
        metodo = "Codice Fiscale"
        valore = this.codFisc

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
        metodo = "P.IVA"
        valore = this.pIva

        if(this.checkValueNotNull("txtPiva")){
          if(isNaN(this.pIva))
            controlliOk = false;
        }
        else{
          controlliOk = false;
        }
        
        
        break;
      case "Luogo e Data di Nascita":
        metodo = "Luogo e Data di Nascita"
        valore = this.luogo + " " + this.nascita

        if(!this.checkValueNotNull("txtLuogo")){
          controlliOk = false;
        }

        if(!this.checkValueNotNull("dtNascita")){
          controlliOk = false;
        }
        
        break;

    }

    // -----------------------
    // Controlli Informazioni
    // -----------------------

    let salvaParenti = [false]
    // controlli nucleo familiare
    let nucleoChecks = ["Coniuge", "Padre", "Madre"];
    let numeroParenti = Number($("#nParenti").val());
    
    let contaParenti = 0;
    // scorriamo tutte le checkbox e contiamo quante sono a true
    let i = 0;
    nucleoChecks.forEach(parente => {
      if($("#chk" + parente).prop('checked')){
        salvaParenti[i] = true;
        contaParenti++;
      }
      else
        salvaParenti[i] = false;
    });
    // sommiamo il numero di figli dichiarati
    contaParenti += Number($("#nFigli").val())

    if(contaParenti != numeroParenti){
      this.errore1 = true
      $("#nParenti").addClass("custom-input-error")
      controlliOk = false;
    }else{
      $("#nParenti").removeClass("custom-input-error")
      this.errore1 = false
    }

    this.contaParenti = contaParenti;
    this.numeroParenti = numeroParenti;

    // attivita esercitat
    if($("input[name='attivita']:checked").val() == undefined){
      controlliOk = false;
      $(".attivita").removeClass("is-valid")
      $(".attivita").addClass("is-invalid")
    }else{
      $(".attivita").removeClass("is-invalid")
      $(".attivita").addClass("is-valid")
    }

    // attivita esercitat
    if($("input[name='properties']:checked").val() == undefined){
      controlliOk = false;
      $(".properties").addClass("is-invalid")
      $(".properties").removeClass("is-valid")
    }else{
      $(".properties").removeClass("is-invalid")
      $(".properties").addClass("is-valid")
    }

    // possesso animali
    if($("input[name='animals']:checked").val() == undefined){
      controlliOk = false;
      $(".animals").addClass("is-invalid")
      $(".animals").removeClass("is-valid")
    }else{
      $(".animals").removeClass("is-invalid")
      $(".animals").addClass("is-valid")
    }



    // prossimo step se tutti i controlli sonoo rispettati
    if(controlliOk){
      let data = {
        cognome: $("#txtCognome").val(),
        nome: $("#txtNome").val(),
        cap: $("#txtCap").val(),
        metodo: {metodo: metodo, valore: valore},
        numeroParenti: numeroParenti,
        coniuge: $("#chkConiuge").prop('checked'),
        padre: $("#chkPadre").prop('checked'),
        madre: $("#chkMadre").prop('checked'),
        figli: Number($("#nFigli").val()),
        attivita: $("input[name='attivita']:checked").val(),
        immmobili: $("input[name='properties']:checked").val(),
        animali: $("input[name='animals']:checked").val()
      }
      
      console.log(data)
      this.thirdStep({pagina: 3, data : data})
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
