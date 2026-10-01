let rijen = 5;
let kolommen = 5;
let alleVakjes = []; // Lijst met alle mogelijke [r, k] indexen
let gekozenVakjes = []; // Lijst met vakjes die al zijn omgeroepen
let huidigVakje = null; // Het vakje dat zojuist is getrokken

let geefGridWeer = false

function setup() {
    createCanvas(500, 600);

    // Vul de array met alle 25 coördinaten van het 5x5 grid
    for (let r = 0; r < rijen; r++) {
        for (let k = 0; k < kolommen; k++) {
            alleVakjes.push([r, k]);
        }
    }

    textAlign(CENTER, CENTER);
}

function draw() {
    background(245);

    // 1. Grid tekenen
    let gridGrootte = 350;
    let vakGrootte = gridGrootte / 5;
    let startX = (width - gridGrootte) / 2;
    let startY = 140;

    //if (geefGridWeer === true) {
    if (keyIsDown(BACKSPACE) || !huidigVakje) {
        for (let r = 0; r < rijen; r++) {
            for (let k = 0; k < kolommen; k++) {
                let x = startX + k * vakGrootte;
                let y = startY + r * vakGrootte;

                // Bepaal de kleur van het vakje
                if (
                    huidigVakje &&
                    huidigVakje[0] === r &&
                    huidigVakje[1] === k
                ) {
                    fill(255, 75, 75); // Rood voor het zojuist getrokken vakje
                } else if (isAlGekozen(r, k)) {
                    fill(200); // Grijs voor vakjes die al eerder zijn geweest
                } else {
                    fill(255); // Wit voor nog beschikbare vakjes
                }

                stroke(0);
                strokeWeight(2);
                rect(x, y, vakGrootte, vakGrootte);

                // Optioneel: toon de index klein in het vakje ter referentie
                fill(100);
                noStroke();
                textSize(12);
                //  text(`[${r}][${k}]`, x + vakGrootte / 2, y + vakGrootte / 2);
            }
        }
    } else {
        text("Druk de Backspace kort in voor een sneak peek van de grid", width / 2, 280);
    }

    // 2. Tekst en UI weergeven
    fill(0);
    noStroke();
    textSize(24);
    text("Druk op ENTER voor een nieuw vakje", width / 2, 40);

    // Grote weergave van de getrokken index onderaan
    textSize(36);
    textStyle(BOLD);
    if (huidigVakje) {
        fill(255, 75, 75);
        text(
            `Gekozen index: [${huidigVakje[0]}][${huidigVakje[1]}]`,
            width / 2,
            80,
        );
    } else {
        fill(100);
        text("Nog geen vakje getrokken", width / 2, 80);
    }

    // Statusbalkje helemaal onderaan
    textSize(16);
    textStyle(NORMAL);
    fill(50);
    text(`Aantal getrokken: ${gekozenVakjes.length} / 25`, width / 2, 120);

    if (alleVakjes.length === 0) {
        fill(0, 150, 0);
        textStyle(BOLD);
        text("ALLE VAKJES ZIJN GETROKKEN!", width / 2, 570);
    }
}

// Luister naar toetsaanslagen
function keyPressed() {
    if (keyCode === ENTER) {
        trekVakje();
    }
}

function keyIsDown() {
  console.log('spatie')
      if (keyCode === BACKSPACE) {
        geefGridWeer = true;
      }
}

// Selecteer een willekeurig vakje uit de resterende opties
function trekVakje() {
    if (alleVakjes.length > 0) {
        // Kies een willekeurige index uit de beschikbare vakjes array
        let randomIndex = floor(random(alleVakjes.length));

        // Haal het vakje uit de lijst (splice verwijdert het direct zodat het niet dubbel kan)
        huidigVakje = alleVakjes.splice(randomIndex, 1)[0];

        // Voeg toe aan de geschiedenis van gekozen vakjes
        gekozenVakjes.push(huidigVakje);
    }
}

// Helperfunctie om te controleren of een vakje al in het verleden is getrokken
function isAlGekozen(r, k) {
    for (let i = 0; i < gekozenVakjes.length; i++) {
        if (gekozenVakjes[i][0] === r && gekozenVakjes[i][1] === k) {
            return true;
        }
    }
    return false;
}
