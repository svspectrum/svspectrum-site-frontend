<script lang="ts">
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

    type SlideData = {title: string, subtitle: string, reason: string, image: IImageData, url: string};    
    
    dayjs.locale("nl");
    dayjs.extend(relativeTime);

    export let relevant : IRelevantData[];

    function getReasonText(relevantItem : IRelevantData) {
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

    let slides : SlideData[];
    $: slides = relevant.map(relevantItem => ({
        title: relevantItem.event.title,
        subtitle: relevantItem.title,
        reason: getReasonText(relevantItem),
        image: relevantItem.event.image,
        url: relevantItem.event.url,
    }));

    let currentIndex = 0;

    let movedSlides : {slide: SlideData, position: number, index: number}[];
    $: movedSlides = getMovedSlides(slides, currentIndex);

    let direction = 0;

    function nextSlide() {
        direction = 1;
        currentIndex += 1;
        
        resetTimer();
    }

    function prevSlide() {
        direction = 1;
        currentIndex -= 1;

        resetTimer();
    }

    function setSlide(index) {
        direction = currentIndex < index ? 1 : -1;
        currentIndex = index;

        resetTimer(7000);
    }

    let timer = null;
    function resetTimer(delay = 5000) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(nextSlide, delay);
    }

    function moveIn(node: HTMLElement, {delay = 0, duration = 1700, easing = null, direction = 1}) {
        return {
            easing,
            delay,
            duration,
            css: t => `transform: translate(${(1-t)*100*direction}%, 0)`
        };
    }

    function moveBack(node: HTMLElement, {delay = 0, duration = 1700}) {
        const z = +getComputedStyle(node).zIndex;

        return {
            delay,
            duration,
            css: t => `z-index: ${z-1-Math.floor((1-t)*100)}`
        }
    }

    onMount(() => {
        resetTimer();

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
    <div class="image-carousel">
        {#each movedSlides as {index, position, slide} (index)}
            {#if position == 0}
            <a href={`/${slide.url}`} class="image" in:moveIn|local={{easing: cubicOut, direction}} out:moveBack|local>
                <Image image={slide.image} />
            </a>
            {/if}
        {/each}
    </div>
    <div slot="top" class="title-carousel">
        {#each movedSlides as {index, position, slide} (index)}
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="slide-info" class:current={position == 0} 
                style={`transform: translate(${position*100}%, 0)`}
                on:click={() => setSlide(index)}>
                <div class="title">{slide.title}</div>
                {#if slide.subtitle && slide.title.toLowerCase().search(slide.subtitle.toLowerCase()) == -1}
                <div class="subtitle">{slide.subtitle}</div>
                {/if}
                <div class="reason">{slide.reason}</div>
            </a>
        {/each}
    </div>
</HeaderImageHolder>
{:else}
<HeaderImageHolder> 
    <img src="/placeholder2.jpg" alt="Er zijn op het moment geen relevante evenementen :(">
    <div slot="top" class="title-carousel">
        <div class="placeholder-title">Er zijn op het moment geen relevante evenementen :(</div>
    </div>
</HeaderImageHolder>
{/if}

<style lang="scss">
    .image-carousel {
        height: 100%;
    }

    .title-carousel {
        user-select: none;
    }

    .title-carousel * {
        color: white;
    }

    .image {
        display: block;
        height: 100%;
        width: 100%;
        z-index: 0;
        position: absolute;
        inset: 0;

        // outline: white solid 100px
        box-shadow:0px 0px 30px 5px rgba($color: #000000, $alpha: .7);
    }

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

        .subtitle {
            font-size: .75em;
        }

        .reason {
            margin-top: .4rem;
        }
    }

    .current {
        font-size: 1.3em;
        font-weight: bold;
    }

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