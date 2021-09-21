<script lang="ts">
    import { draw } from 'svelte/transition';

    export let on : boolean;
    export let duration : number;

    let w : number;
    let h : number;

    function getPoints(w : number, h : number) {
        let points = [];

        const shift = {x: 80, y: 60};
        let cur = {x: 0, y: 0, axisIsX: true};
        let prev = {x: 0, y: 0, axisIsX: false};

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
    <div bind:clientWidth={w} bind:clientHeight={h}>
        <svg>
            {#if on}
            <polyline points={getPoints(w, h)} transition:draw|local = {{duration: duration}}
                fill="none" stroke="white" stroke-width="50px" stroke-linecap="round"/>
            {/if}
        </svg>
    </div>
</div>

<style>   
    .scratch {
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