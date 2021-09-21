<script lang="ts">
import { onMount } from 'svelte';

    import Scratch from './Scratch.svelte';

    let duration = 2500;
    let scratch = false;

    function removeAd() {
        scratch = true;

        setTimeout(nextAd, duration);
    }

    function nextAd(delay = 3000) {
        scratch = false;
        
        setTimeout(removeAd, delay + duration);
    }

    onMount(() => {
        setTimeout(removeAd, 3000);
    });

</script>

<div>
    <a href="https://www.sponsorkliks.com/products/shops.php?club=10046">
        <img src="/sklogo.jpg" alt="SponsorKliks"/>
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