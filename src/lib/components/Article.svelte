<script lang="ts">
    export let title : string = null;
</script>

<article class={$$props.class}>
    {#if title}
        <h1>{title}</h1>
    {/if}
    <slot></slot>
</article>

<style lang="scss">
    article {
        position: relative;
        max-width: calc(75ch + 2rem);
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

        :global(.right) {
            float: right;
        }

        :global(.left) {
            float: left;
        }

        :global(img) {
            border: .5em solid white;
            margin: .5em;
        }
    }
</style>