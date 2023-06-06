<script lang="ts">
    import { onMount } from 'svelte';
    import Scratch from './Scratch.svelte';

    export let offset : number;

    let index = offset;
    let images = ["/vvm-logo.png", "/sklogo.jpg"];
    let links = ["https://www.svspectrum.nl/backend/uploads/VVM_2021_Poster_A3_staand_Nederlands_Spectrum_2081e60906.pdf", "https://www.sponsorkliks.com/products/shops.php?club=10046"];
    let alt = ["VVM", "SponsorKliks"];

    let duration = 2000;
    let scratch = false;

    function removeAd() {
        scratch = true;

        setTimeout(nextAd, duration);
    }

    function nextAd(delay = 3000) {
        scratch = false;
        index = (index + 1) % images.length;
        
        setTimeout(removeAd, delay + duration);
    }

    onMount(() => {
        setTimeout(removeAd, 3000 * (1 + offset));
    });

</script>

<div>
    <a href={links[index]} rel="external">
        <img src={images[index]} alt={alt[index]}/>
    </a>
    <Scratch on={scratch} duration={duration}/>
</div>

<style lang="scss">
    div {
        position: absolute;
        inset: 20px;

        mix-blend-mode: multiply;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
</style>