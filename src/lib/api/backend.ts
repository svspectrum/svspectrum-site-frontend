const backendURL = "https://www.svspectrum.nl/backend";
// const backendURL = "http://localhost:1337/backend";

export function getBackendURL(path: string, API: boolean = false) {
    if (path == null) {
        return "";
    }
    
    // Als het een api is, voegt i "/api" to the backendURL
    // anders laat i backendURL zoals i is
    const baseURL = API ? `${backendURL}/api` : backendURL;

    // Voeg indien nodig een '/' toe
    if (path.charAt(0) == '/') {
        return `${baseURL}${path}`
    } else {
        return `${baseURL}/${path}`
    }
}

export async function fetchBackend(path: string, jwt: string, init?: RequestInit) {    
    const fullPath = getBackendURL(path, true);
    
    if (jwt) {
        // voeg JSON Web Token in de verzoekheader voor authentificatie
        const initWithPassword = {...init, headers: { Authorization: `Bearer ${jwt}`, ...init?.headers}}
        
        return fetch(fullPath, initWithPassword);
    } else {
        return fetch(fullPath, init);
    }
}
