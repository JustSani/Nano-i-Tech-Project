class PersonaFisica {


    constructor(){

        this.struttura = {

            cognome: "string",
            nome: "string",
            cap: "number",

            metodo: {
                metodo: ["Codice Fiscale", "P.IVA", "Luogo e Data di Nascita"],
                valore: "string"
            },

            numeroParenti: "number",
            coniuge: "boolean",
            padre: "boolean",
            madre: "boolean",
            figli: "number",

            attivita: ["Dipendente", "Libero Professionista o Lavoratore Autonomo", "Non Occupato", "Altro"],
            immobili: ["SI", "NO"],
            animali: ["cani e/o gatti", "altro", "NO"]
        }
    }

    controlla(params){
        let check = true;

        // sezione per controlli specifici

        // CAP:
        if(isNaN(params["cap"])) // su front ho messo come stringa, cosi facendo checka sia number che stringa
            check = false
        if(params["cap"].toString().length != 5)
            check = false

        // metodo di identificazione:
        if(!this.struttura.metodo.metodo.includes(params["metodo"]["metodo"]))
            check = false
            
        if(typeof(params["metodo"]["valore"]) != this.struttura.metodo.valore)
            check = false
        
        console.log(params["metodo"]["metodo"])
        switch (params["metodo"]["metodo"]){
            case "Codice Fiscale":
                let regexCodiceFiscale = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i
                if(!regexCodiceFiscale.test(params["metodo"]["metodo"]))
                    check = false;
                break;
            case "P.IVA":
                if(isNaN(params["metodo"]["value"]) || params["metodo"]["valore"].length != 11)
                    check = false
                break;
            case "Luogo e Data di Nascita":
                // bisogna gestire nel caso il nome contenga degli spazi
                let splited = params["metodo"]["valore"].split(" ")

                let data = splited[splited.length - 1]
                let citta = "";

                splited.forEach(element => {
                    if(element != data)
                        citta += element + " "
                });

                break;
                            
        }


        // array degli attributi gia controllati sopra
        let checkedAttributes = ["cap", "metodo"]
        

        // scorriamo i restanti attributi
        Object.keys(this.struttura).forEach(key => {

            // controlliamo che l'attributo selezionato non sia tra quelli
            //gia controllati
            if(!checkedAttributes.includes(key)){

                // controlliamo che il parametro non sia una scelta multipla
                if(typeof(this.struttura[key]) != "object"){
                    // verifichiamo il tipo
                    if(typeof(params[key]) != this.struttura[key]){
                        check = false;
                    }
                }
                // verifichiamo che il valore sia tra quelli selezionabili
                else if(!this.struttura[key].includes(params[key])){
                    check = false;
                }
            }
        });
        return check;
    }
}

module.exports = new PersonaFisica;