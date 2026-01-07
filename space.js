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