const backendURL = "https://www.svspectrum.nl/backend";
// const backendURL = "http://localhost:1337";

export function getBackendURL(path: string) {
    if (path.charAt(0) == '/') {
        return `${backendURL}${path}`
    } else {
        return `${backendURL}/${path}`
    }
}

export async function fetchBackend(path: string, init?: RequestInit) {
	return fetch(getBackendURL(path), init);
}