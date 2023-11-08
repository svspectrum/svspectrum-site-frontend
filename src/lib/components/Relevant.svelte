<!-- Een interactief onderdeel, verantwoordelijk voor het weergeven van een carrousel van dia's, 
    elk met informatie over relevante evenementen. -->

<script lang="ts">
    // Importeer vereiste modules en componenten
    import type { IRelevantData } from "$lib/api/relevant";
    import HeaderImageHolder from "./HeaderImageHolder.svelte";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import "dayjs/locale/nl.js";
    import type { IImageData } from "$lib/api/image";
    import Image from "./Image.svelte";
    import { cubicOut } from 'svelte/easing';
    import { getBackendURL } from "$lib/api/backend";
    import { onMount } from "svelte";

    // Definieer het gegevenstype voor individuele dia's
    type SlideData = { title: string, subtitle: string, reason: string, image: IImageData, url: string };

    // Stel de taal en plug-ins voor dagjs in
    dayjs.locale("nl");
    dayjs.extend(relativeTime);

    // Inkomende gegevens van de bovenliggende component
    export let relevant: IRelevantData[];

    // Functie om de tekst te genereren op basis van de reden van relevantie
    function getReasonText(relevantItem: IRelevantData) {
        if (relevantItem.reason == 'begin') {
            return `begint ${relevantItem.begin.locale("nl").fromNow()}`;
        } else if (relevantItem.reason == 'deadline') {
            return `deadline ${relevantItem.deadline.locale("nl").fromNow()}`;
        } else if (relevantItem.reason == 'spots') {
            return `${relevantItem.spots} ${relevantItem.spots == 1 ? "plek" : "plekken"} in totaal`;
        } else {
            return ""
        }
    }

    // Functie om een lijst met verschoven dia's te genereren
    function getMovedSlides(slides: SlideData[], currentIndex: number) {
        if (!slides.length) {
            return [];
        }

        let movedSlides = [];

        for (let position = -6; position <= 6; position++) {
            const index = position + currentIndex;
            const i = ((index % slides.length) + slides.length) % slides.length;

            movedSlides.push({
                index,
                position,
                i,
                slide: slides[i]
            });
        }

        return movedSlides;
    }

    // Declareer en bereken reactieve variabelen
    let slides: SlideData[];
    $: slides = relevant.map(relevantItem => ({
        title: relevantItem.event.title,
        subtitle: relevantItem.title,
        reason: getReasonText(relevantItem),
        image: relevantItem.event.image,
        url: relevantItem.event.url,
    }));

    let currentIndex = 0;

    let movedSlides: { slide: SlideData, position: number, index: number }[];
    $: movedSlides = getMovedSlides(slides, currentIndex);

    let direction = 0;

    // Functie om naar de volgende dia te navigeren
    function nextSlide() {
        direction = 1;
        currentIndex += 1;

        resetTimer();
    }

    // Functie om naar de vorige dia te navigeren
    function prevSlide() {
        direction = 1;
        currentIndex -= 1;

        resetTimer();
    }

    // Functie om een specifieke dia in te stellen
    function setSlide(index) {
        direction = currentIndex < index ? 1 : -1;
        currentIndex = index;

        resetTimer(7000);
    }

    let timer = null;

    // Functie om de timer opnieuw in te stellen
    function resetTimer(delay = 5000) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(nextSlide, delay);
    }

    // Aangepaste overgang voor het bewegen van dia's
    function moveIn(node: HTMLElement, { delay = 0, duration = 1700, easing = null, direction = 1 }) {
        return {
            easing,
            delay,
            duration,
            css: t => `transform: translate(${(1 - t) * 100 * direction}%, 0)`
        };
    }

    // Aangepaste overgang voor het terugbewegen van dia's
    function moveBack(node: HTMLElement, { delay = 0, duration = 1700 }) {
        const z = +getComputedStyle(node).zIndex;

        return {
            delay,
            duration,
            css: t => `z-index: ${z - 1 - Math.floor((1 - t) * 100)}`
        }
    }

    // Voer de resetTimer-functie uit bij het aanbrengen van het component op het scherm
    onMount(() => {
        resetTimer();

        // Voeg event listeners toe voor focus en blur van het venster
        window.addEventListener('blur', (e) => {
            clearTimeout(timer);
        });

        window.addEventListener('focus', (e) => {
            resetTimer();
        });
    });
</script>


{#if movedSlides.length}
<HeaderImageHolder>
    <!-- Diavoorstelling weergeven als er dia's beschikbaar zijn -->
    <div class="image-carousel">
        {#each movedSlides as {index, position, slide} (index)}
            <!-- Alleen de dia op de huidige positie (position == 0) wordt weergegeven -->
            {#if position == 0}
            <a href={`/${slide.url}`} class="image" in:moveIn|local={{easing: cubicOut, direction}} out:moveBack|local>
                <!-- Koppel een link aan de dia, zodat deze kan worden geopend bij klikken -->
                <Image image={slide.image} />
                <!-- Toon de afbeelding van de dia -->
            </a>
            {/if}
        {/each}
    </div>
    <div slot="top" class="title-carousel">
        {#each movedSlides as {index, position, slide} (index)}
            <!-- Loop door de dia's en toon hun informatie in de carrousel -->
            <!-- De huidige dia (position == 0) wordt als 'current' gemarkeerd -->
            <a class="slide-info" class:current={position == 0} 
                style={`transform: translate(${position*100}%, 0)`}
                on:click={() => setSlide(index)}>
                <!-- De titel van de dia -->
                <div class="title">{slide.title}</div>
                <!-- Toon de ondertitel als deze verschilt van de titel -->
                {#if slide.subtitle && slide.title.toLowerCase().search(slide.subtitle.toLowerCase()) == -1}
                <div class="subtitle">{slide.subtitle}</div>
                {/if}
                <!-- Toon de reden van relevantie van de dia -->
                <div class="reason">{slide.reason}</div>
            </a>
        {/each}
    </div>
</HeaderImageHolder>
{:else}
<HeaderImageHolder>
    <!-- Als er geen dia's beschikbaar zijn, toon een vervangende afbeelding -->
    <img src="/placeholder2.jpg" alt="Er zijn op het moment geen relevante evenementen :(">
    <div slot="top" class="title-carousel">
        <div class "placeholder-title">Er zijn op het moment geen relevante evenementen :(</div>
    </div>
</HeaderImageHolder>
{/if}


<style lang="scss">
    /* Hier wordt de hoogte van de diacarrousel ingesteld op 100% van de beschikbare ruimte. */
    .image-carousel {
        height: 100%;
    }

    /* Hier wordt het selecteren van tekst door de gebruiker uitgeschakeld. */
    .title-carousel {
        user-select: none;
    }

    /* Hier wordt de tekstkleur van alle elementen binnen de titelcarrousel ingesteld op wit. */
    .title-carousel * {
        color: white;
    }

    /* Dit is de stijl voor de dia-afbeeldingen in de carrousel. */
    .image {
        display: block;
        height: 100%;
        width: 100%;
        z-index: 0;
        position: absolute;
        inset: 0;

        // outline: white solid 100px
        box-shadow:0px 0px 30px 5px rgba($color: #000000, $alpha: .7); /* Er wordt een schaduw toegepast om de afbeeldingen te benadrukken. */
    }

    /* Dit is de stijl voor de informatie van de dia's in de carrousel. */
    .slide-info {
        position: absolute;
        left: 0;
        right: 0;
        bottom: .5em;
        margin: auto;

        width: min(18rem, 100vw);
        padding: 10px;

        line-height: 1.1;

        text-align: center;

        transition: transform 1s, font-weight 0.7s, font-size .7s;

        text-shadow: rgba(0, 0, 0, 1) 0 0 5px;

        /* Hier wordt de stijl voor de ondertitel toegepast. */
        .subtitle {
            font-size: .75em;
        }

        /* Hier wordt de stijl voor de reden van de dia toegepast. */
        .reason {
            margin-top: .4rem;
        }
    }

    /* Dit is de stijl voor de huidige dia in de carrousel. */
    .current {
        font-size: 1.3em;
        font-weight: bold;
    }

    /* Dit is de stijl voor het titelblok wanneer er geen relevante evenementen zijn. */
    .placeholder-title {
        position: absolute;
        left: .5rem;
        right: .5rem;
        bottom: .5rem;
        margin: auto;

        text-align: center;

        font-size: 2em;
    }
</style>
