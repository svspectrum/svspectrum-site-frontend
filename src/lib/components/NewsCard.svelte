<script lang="ts">
    import type { INewsData } from "$lib/api/news";
    import { onMount } from "svelte";
    import Article from "./Article.svelte";
    import Image from "./Image.svelte";

    export let item: INewsData;
    let angle;

    onMount(() => {
        angle = Math.random()*2-1;
    });
</script>

<article class="news-card">
    <a href={`/${item.slug}`} style={`transform: rotate(${angle}deg)`}>
        <div class="top">
            {#if item.type == "event"}
                <Image image={item.image}/>
            {:else if item.type == "post"}
                <Article markdown={item.content}/>
            {/if}
        </div>
        <div class="bottom">

            <h1>{item.title}</h1>
        </div>
    </a>
    <div class="publish-date">
        {item.published_at.format("DD MMM YY")}
    </div>
</article>

<style lang="scss">
    a {
        display: block;
        color: inherit;
        text-decoration: inherit;

        background-image: url("/paper-light.png");
        padding: 1rem;
        position: relative;

        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4);
        border-radius: 2px;
        z-index: 1;

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

        &:nth-of-type(odd) .publish-date{
            left: 100%;
        }

        &:nth-of-type(even) .publish-date{
            right: 100%;
        }
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

    .publish-date {
        position: absolute;
        top: 50%;
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
</style>