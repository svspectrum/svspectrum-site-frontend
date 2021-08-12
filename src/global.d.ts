/// <reference types="@sveltejs/kit" />

declare global {
    let FullCalendar: any;
    interface Window { ICAL: any; }
}

window.ICAL = window.ICAL || {};