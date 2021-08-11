<script lang="ts">
    import showdown from "showdown"; 
    let { Converter } = showdown;
    
    export let title : string = null;
    export let markdown : string = null;

    let converter = new Converter({headerLevelStart: 2, strikethrough: true});
    
    let html : string;
    $: html = markdown ? converter.makeHtml(markdown) : null;
</script>

<article class={$$props.class}>
    {#if title}
        <h1>{title}</h1>
    {/if}
    {#if html}
        {@html html}
    {/if}
    <slot></slot>
</article>

<style lang="scss">
    article {
        position: relative;
        max-width: 120ch;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;

        &::after {
            content: "";
            position: absolute;
            top: 1rem;
            bottom: 1rem;
            left: .5rem;
            width: 2.3px;
            background: #005f7f;
            border-radius: 50%/50px;
        }
    }
</style>