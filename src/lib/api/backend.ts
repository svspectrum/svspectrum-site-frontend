const backendURL = "https://www.svspectrum.nl/backend";
// const backendURL = "http://localhost:1337/backend";

export function getBackendURL(path: string, API: boolean = false) {
    if (path == null) {
        return "";
    }
    
    const baseURL = API ? `${backendURL}/api` : backendURL;
    if (path.charAt(0) == '/') {
        return `${baseURL}${path}`
    } else {
        return `${baseURL}/${path}`
    }
}

export async function fetchBackend(path: string, jwt: string, init?: RequestInit) {    
    const fullPath = getBackendURL(path, true);
    
    if (jwt) {
        const initWithPassword = {...init, headers: { Authorization: `Bearer ${jwt}`, ...init?.headers}}
        
        return fetch(fullPath, initWithPassword);
    } else {
        return fetch(fullPath, init);
    }
}
