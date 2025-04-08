const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);

const hour = $('.hour');
const dots = $all('.dot'); 
const min = $('.min');
const sec = $('.sec');
const week = $('.week');
const locationInfo = $('.location-info'); 

let showDot = true;

const settingsButton = document.querySelector('.settings-button');
const settingsPanel = document.querySelector('.settings-panel');
const toggleFormatButton = document.getElementById('toggle-format');
const toggleTimezoneButton = document.getElementById('toggle-timezone');

let is24HourFormat = true; // Por defecto, formato 24H
let showTimezone = true; // Por defecto, mostrar zona horaria

// Detectar el formato del sistema al cargar la página
const systemFormat = new Intl.DateTimeFormat('default', { hour: 'numeric' }).resolvedOptions().hourCycle;
is24HourFormat = systemFormat === 'h23';

// Alternar el formato 12H/24H
toggleFormatButton.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    toggleFormatButton.textContent = is24HourFormat ? 'Formato 12H' : 'Formato 24H';
    update(); // Actualizar el reloj
});

// Alternar la visibilidad de la zona horaria
toggleTimezoneButton.addEventListener('click', () => {
    showTimezone = !showTimezone;
    toggleTimezoneButton.textContent = showTimezone ? 'Ocultar zona horaria' : 'Mostrar zona horaria';
    document.querySelector('.GMT').style.display = showTimezone ? 'block' : 'none';
});

// Mostrar/ocultar el panel de configuración
settingsButton.addEventListener('click', () => {
    settingsPanel.classList.toggle('show');
});

function update() {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const options = { weekday: 'short' };
    const localeTime = new Date(now.toLocaleString("en-US", { timeZone }));

    let hours = localeTime.getHours();
    if (!is24HourFormat) {
        hours = hours % 12 || 12; // Convertir a formato 12H
    }

    // Mantener el primer ':' estático o cambiarlo al cambiar el minuto
    if (localeTime.getSeconds() === 0) {
        dots[0].classList.remove('invisible');
        dots[0].classList.add('visible');
    }

    hour.textContent = String(hours).padStart(2, '0');
    min.textContent = String(localeTime.getMinutes()).padStart(2, '0');
    sec.textContent = String(localeTime.getSeconds()).padStart(2, '0');

    Array.from(week.children).forEach(ele => ele.classList.remove('active'));
    week.children[localeTime.getDay()].classList.add('active');

    if (showTimezone) {
        locationInfo.textContent = `${timeZone} GMT ${String(Math.floor(localeTime.getTimezoneOffset() / -60)).padStart(2, '0')}:${String(Math.abs(localeTime.getTimezoneOffset() % 60)).padStart(2, '0')}`;
    }
}

// Cambiar el intervalo a 1000 ms para sincronizar con los segundos
setInterval(update, 1000);
update();