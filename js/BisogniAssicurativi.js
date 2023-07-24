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

            obbietivi: {
                "Protezione del proprio patrimonio per richieste di risarcimento dovute a danni causati a terzi":"nella vita personale",
                
                "Protezione dei beni":"propri",
                "per": [
                    "per danneggiamento (es: incendio, scoppio, acqua condotta, esplosione, etc)",
                    "per sottrazione (es: furto, scippo, rapina, etc)"],

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
}