import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc)

export function findCookie(cookies: string, cookieName: string) {
    const name = cookieName + "=";
    const cookieList = cookies.split(';');

    for (let cookie of cookieList) {
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
}

export function setCookie(name: string, value: string, expirationDays: number = 0) {
    const expires = expirationDays > 0 ?
        `expires=${dayjs().add(expirationDays, 'day').utc().toString()};` : '';
    document.cookie = `${name}=${value};${expires}path=/`;
}

export function removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
