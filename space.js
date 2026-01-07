const url = "http://api.open-notify.org/astros.json";

const urbenLevokSzamaElem = document.getElementById("urben-levok-szama");
const allomasSzuroElem = document.getElementById("allomas-szuro");
const betoltoElem = document.getElementById("betolto");
const hibaElem = document.getElementById("hiba");
const kartyaTartoElem = document.getElementById("kartya-tarto");

let osszesEmber = [];
let allomasok = [];

function mutatBetolto(mutat) {
    betoltoElem.style.display = mutat ? "block" : "none";
}

function mutatHiba(uzenet) {
    hibaElem.textContent = uzenet;
    hibaElem.style.display = uzenet ? "block" : "none";
}
function kartyaLetrehoz(ember) {
    const kartya = document.createElement("div");
    kartya.className = "kartya";
    kartya.innerHTML = `
        <h2>${ember.nev}</h2>
        <p>Űrállomás: <strong>${ember.allomas}</strong></p>
    `;
    return kartya;
}

function kartyakMegjelenitese(lista) {
    kartyaTartoElem.innerHTML = "";
    lista.forEach(ember => {
        const kartya = kartyaLetrehoz(ember);
        kartyaTartoElem.appendChild(kartya);
    });
}

function szuroFrissitese() {
    const kivalasztott = allomasSzuroElem.value;
    if (kivalasztott === "osszes") {
        kartyakMegjelenitese(osszesEmber);
    } else {
        const szurt = osszesEmber.filter(e => e.allomas === kivalasztott);
        kartyakMegjelenitese(szurt);
    }
}

function allomasSzuroFeltoltese() {
    allomasSzuroElem.innerHTML = `<option value="osszes">Összes</option>`;
    allomasok.forEach(allomas => {
        const opcio = document.createElement("option");
        opcio.value = allomas;
        opcio.textContent = allomas;
        allomasSzuroElem.appendChild(opcio);
    });
}
async function adatokBetoltese() {
    mutatBetolto(true);
    mutatHiba("");
    try {
        const valasz = await fetch(url);
        if (!valasz.ok) throw new Error("Hiba a hálózati kérés során!");
        const data = await valasz.json();

        osszesEmber = data.people.map(e => ({
            nev: e.name,
            allomas: e.craft
        }));

        urbenLevokSzamaElem.textContent = `Jelenleg ${data.number} ember tartózkodik az űrben.`;

        allomasok = [...new Set(osszesEmber.map(e => e.allomas))];
        allomasSzuroFeltoltese();
        szuroFrissitese();
    } catch (err) {
        mutatHiba("Nem sikerült betölteni az adatokat. Próbáld újra később!");
        kartyaTartoElem.innerHTML = "";
        urbenLevokSzamaElem.textContent = "";
    } finally {
        mutatBetolto(false);
    }
}

allomasSzuroElem.addEventListener("change", szuroFrissitese);

adatokBetoltese();