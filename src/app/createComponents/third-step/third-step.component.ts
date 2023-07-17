import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.css']
})
export class ThirdStepComponent {

  errore1: boolean = false;
  @Output() selection = new EventEmitter;
  closeModule(val: any){
    this.selection.emit(val)
  }
  ngOnInit(){

    
    let clickedBeni = false;

    $(".beni").on("click", function(){
      if(!clickedBeni){
        $("#chkDann").removeAttr('disabled');
        $("#chkSottr").removeAttr('disabled');
        $("#chkTrasf").removeAttr('disabled');
        clickedBeni = true;
      }
    })

    let clickedFamiglia = false;
    $(".protezionePersonaFamiglia").on("click", function(){
      if(!clickedFamiglia){
        $("#chkInfortuni").removeAttr('disabled');
        $("#chkMalattia").removeAttr('disabled');
        $("#chkMorte").removeAttr('disabled');
        clickedFamiglia = true;
      }
    })
  }
  save(){
    let controlliOk = true;

    //ambito della copertura
    if($("input[name='ambito']:checked").val() == undefined){
      controlliOk = false;
      $(".ambito").addClass("is-invalid")
      $(".ambito").removeClass("is-valid")
    }else{
      $(".ambito").removeClass("is-invalid")
      $(".ambito").addClass("is-valid")
    }

    
    //$("input[name='beni']:checked").val()

    // esistenza altre polize ass
    /*
    $("#chkRespCivil")
    $("#chkInfor")
    $("#chkMalat")
    $("#chkIncen")
    $("#chkFurto")
    $("#chkCauz")
    $("#chkPrevid")
    $("#chkMulti")
    $("#chkTut")
    $("#chkTrasp")
    $("#chkAuto")
    $("#chkAltro")
    */


    // controllo di selezione di almeno un obbiettivo
    if($(".selectJustOne:checked").val() == undefined){
      controlliOk = false;
      $(".selectJustOne").addClass("is-invalid")
      this.errore1 = true
    }
    else{
      $(".selectJustOne").removeClass("is-invalid")
      this.errore1 = false
    }

    //protezione dei beni
    if($("input[name='beni']:checked").val() != undefined 
        && !$("#chkDann").prop("checked") && !$("#chkSottr").prop("checked") && !$("#chkTrasf").prop("checked")){
      $("#chkDann").addClass('is-invalid');
      $("#chkSottr").addClass('is-invalid');
      $("#chkTrasf").addClass('is-invalid');
      controlliOk = false;
    }
    else{
      $("#chkDann").removeClass('is-invalid');
      $("#chkSottr").removeClass('is-invalid');
      $("#chkTrasf").removeClass('is-invalid');
    }

    //protezione della persona/familiari

    if($("#chkSestessi").prop("checked") || $("#chkFamiglia").prop("checked"))
       if(!$("#chkInfortuni").prop("checked") && !$("#chkMalattia").prop("checked") && !$("#chkMorte").prop("checked")){
        $("#chkInfortuni").addClass('is-invalid');
        $("#chkMalattia").addClass('is-invalid');
        $("#chkMorte").addClass('is-invalid');
        $("#chkInfortuni").removeClass('is-valid');
        $("#chkMalattia").removeClass('is-valid');
        $("#chkMorte").removeClass('is-valid');
        controlliOk = false;
        }
      else{
        $("#chkInfortuni").addClass('is-valid');
        $("#chkMalattia").addClass('is-valid');
        $("#chkMorte").addClass('is-valid');
        $("#chkInfortuni").removeClass('is-invalid');
        $("#chkMalattia").removeClass('is-invalid');
        $("#chkMorte").removeClass('is-invalid');

      }
    else{
        $("#chkInfortuni").removeClass('is-invalid');
        $("#chkMalattia").removeClass('is-invalid');
        $("#chkMorte").removeClass('is-invalid');
    }

    if(controlliOk){
      let data = {
        ambito: $("input[name='ambito']:checked").val(),
        copertureAssicurative: {
          "Responsabilità Civile": $("#chkRespCivil").prop("checked"),
          "Infortuni": $("#chkInfor").prop("checked"),
          "Malattie": $("#chkMalat").prop("checked"),
          "Incendio": $("#chkIncen").prop("checked"),
          "Furto": $("#chkFurto").prop("checked"),
          "Cauzioni": $("#chkCauz").prop("checked"),
          "Previdenza": $("#chkPrevid").prop("checked"),
          "Multi rischi in Genere": $("#chkMulti").prop("checked"),
          "Tutela Legale": $("#chkTut").prop("checked"),
          "Trasporti": $("#chkTrasp").prop("checked"),
          "Auto": $("#chkAuto").prop("checked"),
          "Altro": $("#chkAltro").prop("checked")
        },
        obbiettivi: new Array(),
      }
      if($("input[name='patrimonio']:checked").val()){
        data.obbiettivi.push({"Protezione del proprio patrimonio per richieste di risarcimento dovute a danni causati a terzi": $("input[name='patrimonio']:checked").val()})
      }

      if($("input[name='beni']:checked").val()){
        let arr = []
        if($("#chkDann").prop("checked"))
          arr.push("per danneggiamento (es: incendio, scoppio, acqua condotta, esplosione, etc)")
        if($("#chkSottr").prop("checked"))
          arr.push("per sottrazione (es: furto, scippo, rapina, etc)")
        if($("#chkTrasf").prop("checked"))
          arr.push("per trasferimento, trasporti")

        data.obbiettivi.push({
          "Protezione dei beni": $("input[name='beni']:checked").val(), 
          per: arr
        })
      }
      if($("input[name='tutela']:checked").val()){
        data.obbiettivi.push({"Tutela legale":$("input[name='tutela']:checked").val()})
      }
      if($("#chkSestessi").prop("checked") || $("#chkFamiglia").prop("checked")){
        
        let array = []
        if($("#chkSestessi").prop("checked"))
          array.push("se stessi")
        if($("#chkFamiglia").prop("checked"))
          array.push("la famiglia") // Dom Toretto        
        
        
        let specific = []

        if($("#chkInfortuni").prop("checked"))
          specific.push("per infortuni")
        if($("#chkMalattia").prop("checked"))
          specific.push("per malattia") // Dom Toretto        
        if($("#chkMorte").prop("checked"))
          specific.push("per morte") 

        data.obbiettivi.push({"Protezione della propria persona e/o dei familiari": array, 
        "E in maniera specifica": specific})
      }
      if($("input[name='viaggi']:checked").val()){
        data.obbiettivi.push({"Protezione viaggi":$("input[name='viaggi']:checked").val()})
      }

      this.closeModule({pagina: 4, data: data})
    }

    
  }
}
