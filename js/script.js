const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);

const hour = $('.hour');
const dots = $all('.dot'); 
const min = $('.min');
const sec = $('.sec');
const week = $('.week');
const locationInfo = $('.location-info'); 

let showDot = true;

function update() {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const options = { weekday: 'short' };
    const localeTime = new Date(now.toLocaleString("en-US", { timeZone }));

    // Mantener el primer ':' estático o cambiarlo al cambiar el minuto
    if (localeTime.getSeconds() === 0) {
        dots[0].classList.remove('invisible');
        dots[0].classList.add('visible');
    }

    hour.textContent = String(localeTime.getHours()).padStart(2, '0');
    min.textContent = String(localeTime.getMinutes()).padStart(2, '0');
    sec.textContent = String(localeTime.getSeconds()).padStart(2, '0');

    Array.from(week.children).forEach(ele => ele.classList.remove('active'));
    week.children[localeTime.getDay()].classList.add('active');

    locationInfo.textContent = `${timeZone} [GMT ${localeTime.getTimezoneOffset() / -60}]`;
}

// Cambiar el intervalo a 1000 ms para sincronizar con los segundos
setInterval(update, 1000);
update();