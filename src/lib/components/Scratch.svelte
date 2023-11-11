<!-- Het maken van een kraslotachtige animatie (sponsoranimatie) -->

<script lang="ts">
    import { draw } from 'svelte/transition';

    // De 'on' prop geeft aan of de animatie actief is.
    export let on: boolean;
    // De 'duration' prop bepaalt de duur van de animatie.
    export let duration: number;

    // Lokale variabelen voor de breedte (w) en hoogte (h) van het element.
    let w: number;
    let h: number;

    // Functie om de punten te berekenen voor de polyline van de krasanimatie.
    function getPoints(w: number, h: number) {
        let points = [];

        // Instellingen voor de verschuiving van de krasbeweging.
        const shift = {x: 80, y: 60};
        let cur = {x: 0, y: 0, axisIsX: true};
        let prev = {x: 0, y: 0, axisIsX: false};

        // Genereer de punten op basis van de breedte en hoogte.
        while (cur.x < w || cur.y < h) {
            if (cur.axisIsX) {
                cur.x += shift.x;

                if (cur.x >= w) {
                    cur.x = w;
                    cur.axisIsX = false;
                }
            } else {
                cur.y += shift.y;

                if (cur.y >= h) {
                    cur.y = h;
                    cur.axisIsX = true;
                }
            }

            points.push(`${cur.x},${cur.y}`);
            [cur, prev] = [prev, cur];
        }

        return points.join(" ");
    }
</script>

<div class="scratch">
    <!-- Het SVG-element waarin de krasanimatie wordt weergegeven. -->
    <div bind:clientWidth={w} bind:clientHeight={h}>
        <svg>
            {#if on}
            <!-- De polyline die de krasanimatie vertegenwoordigt. -->
            <polyline points={getPoints(w, h)} transition:draw|local = {{duration: duration}}
                fill="none" stroke="white" stroke-width="50px" stroke-linecap="round"/>
            {/if}
        </svg>
    </div>
</div>

<style>
    .scratch {
        // Zorg ervoor dat elementen eronder reageerbaar blijven op gebeurtenissen.
        pointer-events: none;
        position: absolute;
        left: 0;
        top: 0;
    }

    * {
        width: 100%;
        height: 100%;
    }
</style>

