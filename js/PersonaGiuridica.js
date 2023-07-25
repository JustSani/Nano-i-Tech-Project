class PersonaGiuridica {


    constructor(){

        this.struttura = {

            ragSoc: "string",
            pIva: "number",
            cap: "number",
            settore: "string",
            immobili: ["SI", "NO"],
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

        // P.IVA
        if(isNaN(params["pIva"]) || params["pIva"].length != 11)
            check = false

        console.log(check)
        
        // array degli attributi gia controllati sopra
        let checkedAttributes = ["cap", "pIva"]        

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
                        console.log(key)
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


module.exports = new PersonaGiuridica;