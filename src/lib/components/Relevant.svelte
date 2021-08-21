<script lang="ts">
    import type { IRelevantData } from "$lib/api/relevant";
    import HeaderImageHolder from "./HeaderImageHolder.svelte";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime.js";
    import "dayjs/locale/nl.js";
    import type { IImageData } from "$lib/api/image";
    import Image from "./Image.svelte";
    import { cubicOut } from 'svelte/easing';

    type SlideData = {title: string, subtitle: string, reason: string, image: IImageData, slug: string};    
    
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
        slug: relevantItem.event.slug,
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

        resetTimer();
    }

    let timer = null;
    function resetTimer() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(nextSlide, 3500);
    }

    resetTimer();

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
</script>

<HeaderImageHolder>
    <div class="image-carousel">
        {#each movedSlides as {index, position, slide} (index)}
            {#if position == 0}
            <a href={`/${slide.slug}`} class="image" in:moveIn|local={{easing: cubicOut, direction}} out:moveBack|local>
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
                <div>{slide.title}</div>
                <div>{slide.subtitle}</div>
                <div>{slide.reason}</div>
            </a>
        {/each}
    </div>
</HeaderImageHolder>

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
        bottom: 0;
        margin: auto;

        width: 25ch;
        padding: 10px;

        text-align: center;

        transition: transform 1s, font-weight 0.7s, font-size .7s;

        text-shadow: rgba(0, 0, 0, 1) 0 0 5px;
    }

    .current {
        font-size: 1.3em;
        font-weight: bold;
    }
</style>