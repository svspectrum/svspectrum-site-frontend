<script lang="ts">
    import { getBackendURL } from "$lib/api/backend";

    import type { IImageData } from "$lib/api/image";

    export let image : IImageData;
    
    let reveal, hide, instant = false;
    
    let element;
    $: if (element) reveal = element.complete;
    
    const loadStartTime = Date.now();
    $: if (reveal) {
        const loadEndTime = Date.now();

        if (loadEndTime - loadStartTime < 30) {
            instant = true;
        }
    }
</script>

<div class="image-wrapper" class:hide class:reveal class:instant>
    <img 
        class="placeholder"
        src={image.placeholder} alt=""
        width={image.width} height={image.height}
        />

    <img 
        class="image"
        src={getBackendURL(image.url)} alt={image.alternativeText} 
        width={image.width} height={image.height}
        bind:this={element}
        on:load={() => {reveal = true;}}
        on:transitionend={() => hide = true}
        loading="lazy"/>
</div>

<style lang="scss">
    .image-wrapper {
        display: grid;
        height: 100%;
    }

    img {
        grid-column-start: 1;
        grid-row-start: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .placeholder {
        filter: blur(2vh);
        clip-path: content-box;
    }

    .image {
        opacity: 0;
        transition: opacity 400ms;
    }

    .reveal {
        .image {
            opacity: 1;
        }
    }
    
    .instant {
        img {
            transition: none;
        }
    }

    .hide, .instant {
        .placeholder {
            visibility: hidden;
        }
    }
</style>