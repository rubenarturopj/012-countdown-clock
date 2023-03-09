// first we harcoded everything in the html

const monthsOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

// giveaway es el contenedor del texto que dice cuando sera llevado a cabo
const giveaway = document.querySelector(".giveaway");
//deadline s el gran contenedor, adentro tiene a los 4 cuadritos de cuenta regresiva
const deadline = document.querySelector(".deadline");
// items equivale a todos los cuadritos donde aparece el tiempo que falta
const items = document.querySelectorAll(".deadline-format h4");

// to MANUALLY set up a specific date (hardcoded)
//                 year, month(0-11), day, hour(0-24), minutes, seconds
let futureDate = new Date(2024, 11, 31, 17, 30, 0);

/*  ****************************************************************
    Otra forma para poner una fecha de forma AUTOMATICA 

    let tempDate = new Date();
    let tempYear = tempDate.getFullYear();
    let tempMonth = tempDate.getMonth();
    let tempDay = tempDate.getDate();
    // months are ZERO index based;
    const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
    ****************************************************************
*/

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = monthsOfTheYear[month];

const date = futureDate.getDate();

let weekday = futureDate.getDay();
weekday = daysOfTheWeek[weekday];

giveaway.textContent = `giveaway ends on ${weekday}, ${month} ${date} ${year} at ${hours}:${minutes}pm.`;

// future time in milliseconds ms
// .getTime()  nos da la fecha establecida como deadline arriba en milisegundos no en formato de fecha
const futureTime = futureDate.getTime();
// console.log(futureTime);

// funcion para calcular el tiempo que queda. Vamos a restarle al tiempo futuro en milisegundos
// el tiempo que hace ahorita en milisegundas
function getRemainingTime() {
    const today = new Date().getTime(); // la fecha de hoy en milisegundos
    // console.log(today);
    const tiempo = futureTime - today;
    // console.log(tiempo);

    /**1 s = 1000ms
     * 1 min = 60 s
     * 1 h = 60 min
     * 1 d = 24 h
     */

    const oneDay = 1000 * 60 * 60 * 24;
    const oneHour = 1000 * 60 * 60;
    const oneMinute = 1000 * 60;
    const oneSecond = 1000;
    // console.log(oneDay);

    let days = tiempo / oneDay;
    days = Math.floor(days);
    // console.log(days);

    let hours = Math.floor((tiempo % oneDay) / oneHour);
    // console.log(hours);

    let minutes = Math.floor((tiempo % oneHour) / oneMinute);
    // console.log(minutes);

    let seconds = Math.floor((tiempo % oneMinute) / oneSecond);
    // console.log(seconds);

    // para darle formato a los números cuando te queden 2 horas, por ejemplo, que muestre 02
    function format(numero) {
        if (numero < 10) {
            return (numero = `0${numero}`);
        }
        return numero;
    }
    // set values array
    // aquí creamos un array con los resultados y sustituimos el relleno de items (arriba top)
    const values = [days, hours, minutes, seconds];

    items.forEach(function (element, index) {
        element.innerHTML = format(values[index]);
    });

    // si la cuenta regresiva llega a 0, para que no marque 0-02 como error, etc.
    // Que el contador se detenga, se desaparezca y en su lugar aparezca un texto que diga
    // que ya terminô
    if (tiempo < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired<h4>`;
    }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

//invocando la funcion. Importante que estê al final
getRemainingTime();
