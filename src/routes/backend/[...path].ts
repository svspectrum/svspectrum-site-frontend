// Deze funct is beschikbaar over het hele document
// en wordt asynchroon uitgevoerd
// Het geeft een foutcode terug
// Dit zorgt ervoor dat er niet een oneindig loop komt met
// verzoeken aan de backend als die er niet is.
// Een verzoek aan de backend via de fronend komt automatisc
// in dit document terecht, door de naamgeving.
export async function get({ }) {
    return {
        status: 503,
        body: "backend is niet beschikbaar",
    }
}
