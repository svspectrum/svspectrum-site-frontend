<script lang="ts">
    import type { INewsData } from "$lib/api/news";
    import NewsCard from "./NewsCard.svelte";
    import Ad from "./Ad.svelte";

    export let news: INewsData[];
</script>

<div class="news-tree">
    <div class="top"></div>
    <div class="media">
        <Ad />
        <div class="publish-date">
            <i>Gepost<br/>op</i>
        </div>
    </div>
    <div class="timeline">
        <h1>Nieuws</h1>
    </div>
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
        grid-template-columns:  1fr;
        grid-template-rows: auto 1fr auto [last-line];
        grid-auto-rows: 1fr;
        grid-auto-flow: row dense;
        row-gap: 2rem;

        padding: 0rem 1rem 2rem 1rem;
        box-sizing: border-box;
        
        z-index: unset;
        
        .media {
            position: relative;
        }

        .timeline {
            h1 {
                font-size: 2rem;
                text-align: center;

                border-bottom: black solid 4px;
                padding: 0 .3ch;
            }
        }

        :global(.publish-date) {
            margin: .5em .25em 0em .25em;
            &::before {
                content: "Gepost op "
            }
        }
    }

    .publish-date {
        display: none;
    }

    /* Tablet menu */
    @media all and (min-width: 700px) {
        .publish-date {
            display: inherit;
        }

        .news-tree {
            grid-template-columns: 1fr var(--timeline-width);

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

            :global(.news-card), .media, .top {
                grid-column: 1;
            }

            :global(.publish-date) {
                margin: 0;
                position: absolute;
                top: 50%;
                left: 100%;
                transform: translate(0%, -50%);
                width: var(--publish-time-width);
                text-align: center;
            
                &::after, &::before {
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
                &::after {
                    left: calc(100% + var(--timeline-line-width)/2);
                }
            }
        }
    }

    /* Desktop menu */
    @media all and (min-width: 960px) {
        .publish-date{
            left: unset;
            right: 100%;
        }
        
        .news-tree {
            grid-template-columns: 1fr var(--timeline-width) 1fr;
            grid-template-rows: 4rem [last-line];

            padding: 0rem 1rem 2rem 1rem;

            .top {
                grid-column: 1;
                grid-row: 1;
            }

            .media {
                grid-column: 3;
                grid-row: span 2;
            }

            :global {
                .news-card {
                    grid-row: span 2;

                    &:nth-child(odd) {
                        grid-column: 3;
                        .publish-date{
                            left: unset;
                            right: 100%;
                        }
                    }

                    &:nth-child(even) {
                        grid-column: 1;
                        .publish-date{
                            left: 100%;
                        }
                    }
                }
            }
        }
    }
</style>