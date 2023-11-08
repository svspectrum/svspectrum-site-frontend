<!-- Functie hele document:
    Het weergeven van afbeeldingen met geavanceerde laadeffecten, 
    waaronder vervaging en animatie bij het laden van afbeeldingen. 
    Het houdt ook rekening met de laadtijd van de afbeelding om te bepalen
     of deze als "instant" kan worden weergegeven. De CSS-styling zorgt voor 
     visuele effecten bij het laden van de afbeelding.-->

<!-- Afbeelding beheren en controleren of de afbeelding 
    direct (instant) kan worden weergegeven.-->    
<script lang="ts">
    // Importeer de getBackendURL-functie vanuit de "$lib/api/backend" module.
    import { getBackendURL } from "$lib/api/backend";

    // Importeer het type IImageData vanuit de "$lib/api/image" module.
    import type { IImageData } from "$lib/api/image";

    // Declareer een variabele 'image' van het type IImageData.
    export let image : IImageData;

    // Declareer de variabelen 'reveal', 'hide', en 'instant' en initialiseer ze als 'false'.
    let reveal, hide, instant = false;

    // Declareer een variabele 'element'.
    let element;

    // Als 'element' bestaat, stel 'reveal' in op de waarde van 'element.complete'.
    $: if (element) reveal = element.complete;

    // Sla het tijdstip op wanneer het laden begint.
    const loadStartTime = Date.now();

    // Als 'reveal' waar is, voer de volgende code uit.
    $: if (reveal) {
        // Sla het tijdstip op wanneer het laden eindigt.
        const loadEndTime = Date.now();

        // Als het laden minder dan 30 milliseconden duurde, stel 'instant' in op 'true'.
        if (loadEndTime - loadStartTime < 30) {
            instant = true;
        }
    }
</script>

<div class="image-wrapper" class:hide class:reveal class:instant>
    <!-- Vervangende afbeelding (placeholder) -->
    <img 
        class="placeholder"
        src={image.placeholder} alt=""
        width={image.width} height={image.height}
        />
    <!-- Werkelijke afbeelding -->
    <img 
        class="image"
        src={getBackendURL(image.url)} alt={image.alternativeText} 
        width={image.width} height={image.height}
        bind:this={element}

        {/* Handelt het laden van de afbeelding af */}
        on:load={() => {reveal = true;}} 

        {/* Handelt het voltooien van CSS-overgangen af */}
        on:transitionend={() => hide = true}

        {/* Lazy loading voor betere prestaties */}
        loading="lazy"/>
</div>

<style lang="scss">
    /* Stijl voor de container van de afbeelding */
    .image-wrapper {
        display: grid;
        height: 100%;
    }

    /* Algemene stijl voor alle afbeeldingselementen */
    img {
        grid-column-start: 1;
        grid-row-start: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Stijl voor de vervangende (placeholder) afbeelding */
    .placeholder {
        filter: blur(2vh); /* Toepassen van vervagingseffect */
        clip-path: content-box; /* Clip-path voor de afbeeldingsgrootte */
    }

    /* Stijl voor de werkelijke afbeelding */
    .image {
        opacity: 0; /* Start met onzichtbare (0) opaciteit */
        transition: opacity 400ms; /* Overgangseffect voor opaciteit */
    }

    /* Stijl voor de werkelijke afbeelding als deze wordt onthuld */
    .reveal {
        .image {
            opacity: 1; /* Opaciteit 1 om de afbeelding te onthullen */
        }
    }

    /* Stijl voor de afbeelding met directe weergave (instant) */
    .instant {
        img {
            transition: none; /* Geen overgangseffecten toepassen */
        }
    }

    /* Stijl om de zichtbaarheid van de afbeelding te verbergen of direct te weergeven */
    .hide, .instant {
        .placeholder {
            visibility: hidden; /* Verberg de placeholder-afbeelding */
        }
    }
</style>
