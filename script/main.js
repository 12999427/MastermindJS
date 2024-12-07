window.onload = function () {
    let dim_y = 9;
    let tabella = document.createElement("table");
    tabella.dataset.alpha = 0;
    for (let y = 0; y<dim_y; y++) {
        let riga = document.createElement("tr");
        for (let x = 0; x<5; x++) {
            let cella = document.createElement("td");
            let puls = document.createElement("button");

            cella.style.width = "50px";
            cella.style.height = "50px";
            
            if (x<4) {
                puls.style.width = "50px";
                puls.style.height = "50px";
                puls.dataset.colore = 5;
                puls.dataset.x = x;
                puls.dataset.y = y;
                puls.dataset.tipo = "colore";

                puls.id = `${x}/${y}`;
                puls.onclick = function () {
                    cambiaColore(this);
                };
            } else if (x==4) {
                puls.style.width = "30px";
                puls.style.height = "30px";
                puls.dataset.tipo = "conferma";
                puls.disabled = y!=0;
                puls.onclick = function () {
                    console.log("cas");
                    progredisci();
                };
            }

            cella.appendChild(puls);
            riga.appendChild(cella);
        }
        tabella.appendChild(riga);
    }
    document.getElementById("gioco").appendChild(tabella);
}

function cambiaColore (obj) {
    let coloreNuovo = (parseInt(obj.dataset.colore)+1)%6;
    obj.dataset.colore = coloreNuovo;
    const colori = new Map ([
        [0, "red"],
        [1, "yellow"],
        [2, "green"],
        [3, "blue"],
        [4, "black"],
        [5, "brown"]
    ]);
    obj.style.backgroundColor = colori.get(coloreNuovo);
}

function progredisci () {
    let tabella = document.querySelector("table");
    let ciclo = parseInt(tabella.dataset.alpha);
    tabella.childNodes.forEach( (riga) => {
        riga.childNodes.forEach ( (elementoGenitore) => {
            let elemento = elementoGenitore.childNodes[0];
            if (parseInt(elemento.dataset.y) == ciclo) {
                if (elemento.dataset.tipo=="colore") {
                    elemento.disabled = true;
                    
                    let txt = document.createTextNode("//");
                    elemento.appendChild(txt);
                } else {
                    elemento.disabled = true; //progredisci puls
                }
            }
        });
    });
    tabella.dataset.alpha = parseInt(tabella.dataset.alpha) + 1;
}