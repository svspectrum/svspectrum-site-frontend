<script lang="ts">
    import type { INewsData } from "$lib/api/news";
    import NewsCard from "./NewsCard.svelte";

    export let news: INewsData[];
</script>

<div class="news-tree">
    <div class="timeline"></div>
    <div class="top"></div>
    <div class="media"></div>
    {#each news as item (item.slug)}
        <NewsCard item={item}/>
    {/each}
</div>

<style lang="scss">
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
        }

        .timeline {
            position: absolute;
            grid-column: 2 / span 1;
            justify-self: center;

            height: 100%;
            // width: var(--timeline-width);
            width: var(--timeline-line-width);
            background-color: black;
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


</style>