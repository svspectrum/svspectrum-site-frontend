<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    import { cubicOut, quadOut } from 'svelte/easing';

    export let amount = 6;
    const min = 1;
    const max = 31;
    let doodles = [];

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    onMount(() => {
        function isOrderBad(doodles) {
            let prev = NaN;
            let badness = 0;
            for (const doodle of doodles) {
                let diff = doodle.x - prev;
                prev = doodle.x;

                if (Math.abs(diff) == 1) {
                    badness += 1;
                }
            }
            
            return badness > 1;
        }

        for (let i = 0; i < amount; i++) {
            let doodle : number;
            do {
                doodle = randomInteger(min, max);
            } while (doodles.includes(doodle));

            doodles.push({id: doodle, x: i});
        }

        do {
            doodles = shuffle(doodles);
        } while (isOrderBad(doodles))

        let y = 0;
        for (const doodle of doodles) {
            doodle.x = (doodle.x + 0.5)/amount;
            doodle.y = (y + 0.5)/amount;
            
            y++;
        }

        if (amount == 1) {
            doodles[0].x = Math.random()*0.8 + 0.1;
        }
    });
</script>

<div class="doodles">
    {#each doodles as doodle}
        <img transition:fade|local={{duration: 2000, easing: quadOut}} src={`/doodles/1/${doodle.id}.png`} style={`top: ${doodle.y*100}%; left: ${doodle.x*100}%; max-width: ${100/amount}%; max-height: ${Math.min(100,200/amount)}%;`}/>
    {/each}
</div>

<style lang="scss">
    div {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }

    img {
        position: absolute;
        transform: translate(-50%, -50%);
        opacity: .08;
    }
</style>