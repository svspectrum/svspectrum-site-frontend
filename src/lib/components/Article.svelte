<script lang="ts">
    export let title : string = null;

    let h: number;
</script>

<article class={$$props.class} bind:clientHeight={h} style={`grid-row: span ${Math.floor(h/10)}`}>
    {#if title}
        <h1>{title}</h1>
    {/if}
    <slot></slot>
</article>

<style lang="scss">
    article {
        --max-article-width: calc(75ch + 2rem);
        position: relative;
        max-width: var(--max-article-width);
        padding: 1rem;
        width: 100%;
        box-sizing: border-box;

        &::before {
            content: "";
            position: absolute;
            top: 1rem;
            bottom: 1rem;
            left: .5rem;
            width: 2.3px;
            background: var(--primary-color);
            border-radius: 50%/50%;
        }

        :global {
            figure {
                background-image: url("/paper-light.png");
                box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4);

                position: relative;
                padding: .5em;
                max-width: 100%;
                margin: 1rem .5rem .5rem .5rem;
                display: block;
                box-sizing: border-box;
                text-align: center;

                & img {
                    width: 100%;
                    display: block;
                    mix-blend-mode: multiply;
                }

                &.image {
                    display: table;

                    &:not(.image-style-side) {
                        margin-left: auto;
                        margin-right: auto;
                    }
                }

                &.image-style-side {
                    float: right;
                }

                &.image_resized {
                    min-width: calc(var(--max-article-width) / 4);
                }

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
        }
    }

    @media only screen and (max-width: 70ch) {
		article {
			padding: .5em .2em;

            &::before {
                content: none;
            }
		}
	}
</style>