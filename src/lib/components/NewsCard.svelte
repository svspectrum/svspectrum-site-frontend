<script lang="ts">
    import type { INewsData } from "$lib/api/news";
    import { getPageVisitState } from "$lib/client/visited";
    import { onMount } from "svelte";
    import Article from "./Article.svelte";
    import Image from "./Image.svelte";

    export let item: INewsData;
    let angle;
    let updates = [];

    $: visitState = getPageVisitState(item);

    $: if (item.type == 'event') {
        updates = item.updates.map(update => ({
            update,
            visitState: getPageVisitState(update)
        }));
    }

    onMount(() => {
        angle = Math.random()*2-1;
    });
</script> 

<article class="news-card">
    <a href={item.url} style={`transform: rotate(${angle}deg)`}>
        <div class="top">
            {#if item.type == "event"}
                <Image image={item.image}/>
            {:else if item.type == "post"}
                <Article>{@html item.content}</Article>
            {/if}
        </div>
        <div class="bottom">
            <h1>{item.title}</h1>
            {#if item.type == "event" && updates.length > 0}
                <ul class="eventposts">
                    {#each updates as {update, visitState}}
                        <li>
                            {#if !visitState.visited && visitState.recentlyPublished}
                                <div class="new subnote">nieuw</div>
                            {:else if !visitState.visitedSinceUpdate && visitState.visited}
                                <div class="updated subnote">geüpdatet</div>
                            {/if}
                            <a href={update.url}>{update.title}</a> - {update.begin.format("DD MMM YY")}
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
        {#if !visitState.visited && visitState.recentlyPublished}
            <div class="new cardnote">nieuw</div>
        {:else if !visitState.visitedSinceUpdate && visitState.visited}
            <div class="updated cardnote">geüpdatet</div>
        {/if}
    </a>
    
    <div class="publish-date">
        <span>{item.begin.format("DD MMM YY")}</span>
    </div>
</article>

<style lang="scss">
    .new {
        --sticker-color: rgb(205, 0, 0);
    }

    .updated {
        --sticker-color: rgb(230, 130, 0);
    }

    .subnote, .cardnote {
        color: white;
        background: var(--sticker-color);
        border-radius: 1em;
        border: .2em rgb(247, 247, 247) solid;
        box-shadow: 0px 0px 4px 0px #00000047;
        line-height: 1.8;
    }

    .cardnote {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        height: 2em;
        padding: 0 .5em;
        border-radius: 1em;
    }

    .subnote {
        display: inline-block;
        padding: 0 .4em;
        height: 1.6em;
        border-radius: 1em;
        font-size: .85rem;
        line-height: 1.4;
    }

    .news-card>a {
        display: block;
        color: inherit;
        text-decoration: inherit;

        background-image: url("/paper-light.png");
        padding: 1rem;
        position: relative;

        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4);
        border-radius: 2px;
        z-index: 1;
        max-width: calc(100vw - 2 * var(--news-tree-padding));

        &::before, &::after {
            content: "";
            position: absolute;
            width: 40px;
            height: 25px;
            background-color: rgba(209, 209, 209, 0.5);
            box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
        }

        &::before {
            top: 3px;
            left: 0;

            transform:translate(-50%, -50%) rotate(-50deg);
        }

        &::after {
            bottom: 0;
            right: 0;
            transform:translate(50%, 50%) rotate(-40deg);
        }
    }

    article {
        position: relative;
    }

    .top {
        position: relative;
        aspect-ratio: 4/1;
        margin-bottom: 1rem;

        :global {
            img {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 2px;
            }

            article {
                height: 100%;
                overflow: hidden;
                color: var(--primary-color-transparent);
                line-height: .6;
                padding: 0;
                mix-blend-mode: multiply;

                &::before {
                    content: none;
                }

                &::after {
                    content: "";
                    position: absolute;
                    inset: -1px;
                    box-sizing: border-box;

                    border: 20px solid transparent;
                    border-image: url("/fade-border.png") 20 round;
                }
            }
        }
    }
</style>