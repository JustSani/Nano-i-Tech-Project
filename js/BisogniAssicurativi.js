class BisogniAssicurativi {

    constructor(){

        this.struttura = {

            ambito: ["Privato", "Lavorativo", "Non sa/Non risponde"],

            copertureAssicurative: {
                "Responsabilità Civile":"boolean",
                "Infortuni":"boolean",
                "Malattie":"boolean",
                "Furto":"boolean",
                "Cauzioni":"boolean",
                "Previdenza":"boolean",
                "Multi rischi in Genere":"boolean",
                "Tutela Legale":"boolean",
                "Trasporti":"boolean",
                "Auto":"boolean",
                "Altro":"boolean"
            },

            obbiettivi: {
                "Protezione del proprio patrimonio per richieste di risarcimento dovute a danni causati a terzi":["nell'esercizio della professione", "nella vita personale"],
                
                "Protezione dei beni":["propri", "altrui"],
                "per": [
                    "per danneggiamento (es: incendio, scoppio, acqua condotta, esplosione, etc)",
                    "per sottrazione (es: furto, scippo, rapina, etc)",
                    "per trasferimento, trasporti"],

                "Tutela legale": ["per la propria professione", "per la famiglia", "per l'azienda"],
                
                "Protezione della propria persona e/o dei familiari": ["se stessi", "la famiglia"],
                "E in maniera specifica":
                    ["per infortuni",
                    "per malattia",
                    "per morte"],
                
                "Protezione viaggi": ["viaggi (annullamento, perdita bagagli, infortuni, assistenza sanitaria, ect)", "conducente", "circolazione"]
            }
             
        }
    }

    controlla(params){
        let check = true;

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ambito
        if(!this.struttura["ambito"].includes(params["ambito"]))
            check = false;
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++


        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // copertureAssicurative
        Object.keys(this.struttura["copertureAssicurative"]).forEach(key => {
            if(this.struttura["copertureAssicurative"][key] != typeof(params["copertureAssicurative"][key]))
                check = false;
        })
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++


        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // obbiettivi
        // controllare che non sia un array vuoto o non un array

        /* -----------------------------------------------------
        *                                                       *
        +-  //protezione patrimonio                             *
        *       // una sola selezione tra quelle disponibili    *
        *                                                       *
        +-  // protezione beni                                  *
        *       // una sola selezione tra quelle disponibili    *
        +-  // per                                              *
        *       // almeno una e foreach delle selezionabili     *
        *                
        +-  // tutela legale
        *       // una sola selezione tra quelle disponibili    
        *                                                       *
        +-  // protezione della persona                         *
        *       // foreach delle selezioni length != 0          *
        +-  // e in maniera specifica                           *
        *       // foreach delle selezioni length != 0          *
                                                                *
        +-  // protezione viaggi                                *
        *       // una sola selezione tra quelle disponibili    *
        // --------------------------------------------------- */
        
        if(params["obbiettivi"].length == 0)
            check = false;
        
    
        // costanti che aumentano la leggibilità
        const protezionePatrimonio = "Protezione del proprio patrimonio per richieste di risarcimento dovute a danni causati a terzi"
        const protezionePersona = "Protezione della propria persona e/o dei familiari" 
        params["obbiettivi"].forEach(element => {
            let valoreOggetto = Object.keys(element)[0]; // prima chiave dell elemento corrente

            switch (valoreOggetto) {

                case protezionePatrimonio:
                    // controllo per verificare che il valore sia tra quelle selezioabili
                    if(!this.struttura["obbiettivi"][protezionePatrimonio].includes(element[protezionePatrimonio]))
                        check = false;

                    

                break;

                case "Protezione dei beni":
                    // controllo per verificare che il valore sia tra quelle selezioabili
                    if(!this.struttura["obbiettivi"]["Protezione dei beni"].includes(element["Protezione dei beni"]))
                        check = false;

                    // scorriamo tutte le selezioni e le controlliamo che siano tra quelle disponibili
                    element["per"].forEach(selezione => {
                        if(!this.struttura["obbiettivi"]["per"].includes(selezione))
                            check = false;
                    })
                    
                    console.log(check)
                break;
                case "Tutela legale":
                    // controllo per verificare che il valore sia tra quelle selezioabili
                    if(!this.struttura["obbiettivi"]["Tutela legale"].includes(element["Tutela legale"]))
                        check = false;
                break;
                case protezionePersona:
                    // *************************************************
                    // protezione della propria persona e/o dei familiari
                    // *************************************************

                    // verifichiamo ci sia almeno una selezione
                    if(element[protezionePersona].length == 0)
                        check = false

                    // scorriamo tutte le selezioni e le controlliamo che siano tra quelle disponibili
                    element[protezionePersona].forEach(selezione => {
                        if(!this.struttura["obbiettivi"][protezionePersona].includes(selezione))
                            check = false;
                    })

                    // ****************************
                    // e in maniera specifica
                    // ***************************
                    
                    // verifichiamo ci sia almeno una selezione
                    if(element["E in maniera specifica"].length == 0)
                        check = false

                    // scorriamo tutte le selezioni e le controlliamo che siano tra quelle disponibili
                    element["E in maniera specifica"].forEach(selezione => {
                        if(!this.struttura["obbiettivi"]["E in maniera specifica"].includes(selezione))
                            check = false;
                    })

                break;

                case "Protezione viaggi":
                    // controllo per verificare che il valore sia tra quelle selezioabili
                    if(!this.struttura["obbiettivi"]["Protezione viaggi"].includes(element["Protezione viaggi"]))
                        check = false;
                break;

                default:
                    check = false;
                break;
            }
        })
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++

        return check;
    }
}


module.exports = new BisogniAssicurativi;