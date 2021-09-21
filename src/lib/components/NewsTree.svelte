<script lang="ts">
    import type { INewsData } from "$lib/api/news";
    import NewsCard from "./NewsCard.svelte";
    import Ad from "./Ad.svelte";

    export let news: INewsData[];
</script>

<div class="news-tree">
    <div class="timeline">
        <h1>Nieuws</h1>
    </div>
    <div class="top"></div>
    <div class="media">
        <Ad />
        <div class="publish-date">
            <i>Gepost<br/>op</i>
        </div>
    </div>
    {#each news as item (item.slug)}
        <NewsCard item={item}/>
    {/each}
</div>

<style lang="scss">
    .promo {
        position: absolute;
        inset: 20px;

        mix-blend-mode: multiply;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .news-tree {
        --timeline-line-width: 4px;
        --publish-time-width: calc(7ch + 1rem);
        --timeline-width: calc(var(--timeline-line-width) + var(--publish-time-width)*2);

        position: relative;
        display: grid;
        width: 100%;
        overflow: hidden;

        grid-template-columns: 1fr var(--timeline-width) 1fr;
        grid-template-rows: 4rem [last-line];
        grid-auto-rows: 1fr;
        grid-auto-flow: row dense;
        row-gap: 2rem;

        padding: 0rem 1rem 2rem 1rem;
        box-sizing: border-box;

        .top {
            grid-column: 1;
            grid-row: 1;
        }

        .media {
            grid-column: 3;
            grid-row: span 2;
            position: relative;
        }

        .timeline {
            position: absolute;
            grid-column: 2 / span 1;
            justify-self: center;

            top: calc(2rem + 12px);
            height: 100%;
            width: var(--timeline-line-width);
            background-color: black;

            h1 {
                font-size: 2rem;
                position: absolute;
                bottom: 100%;
                left: -50%;
                transform: translate(-50%, 0);

                border-bottom: black solid 4px;
                padding: 0 .3ch;
            }
        }

        :global(.news-card) {
            grid-row: span 2;

            &:nth-child(odd) {
                grid-column: 3;
            }

            &:nth-child(even) {
                grid-column: 1;
            }
        }
    }

    .publish-date {
        position: absolute;
        top: 50%;
        transform: translate(0%, -50%);

        width: var(--publish-time-width);
        text-align: center;
        line-height: 1;
        right: 100%;

        &::before {
            content: "";

            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);

            width: 1rem;
            height: var(--timeline-line-width);
            background-color: black;

            border-radius: 6px/50%;
        }

        &::before {
            left: calc(0% - var(--timeline-line-width)/2);
        }
    }
</style>