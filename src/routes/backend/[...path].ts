export async function get({ params }) {
    return {
        status: 503,
        body: "backend is niet beschikbaar",
    }
}