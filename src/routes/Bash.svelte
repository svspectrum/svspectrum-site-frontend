<script lang="ts">
	import Doodles from "$lib/components/Doodles.svelte";

    let iframe: HTMLIFrameElement;

    function handleMessage(e) {
        const eventName = e.data[0];
        const data = e.data[1];

        switch (eventName) {
            case 'setHeight':;
            iframe.style.height = data + 'px';
            break;
        }
    }
</script>

<svelte:window on:message={handleMessage}/>

<svelte:head>
    <title>Spectrum BASH</title>
</svelte:head>

<main>
    <Doodles />
    <div>
        <iframe bind:this={iframe} title="Events on BASH" 
            src="https://bash.social/spectrum/widget?scroll=undefined" 
            frameborder="0" scrolling='no' referrerPolicy = 'no-referrer'>
        </iframe>
    </div> 
<!--     
    <a id='bash-timeline-a' data-username="spectrum" href="https://bash.social/spectrum">
        Events by SV Spectrum 
    </a>
    
    <script src="https://bash.social/widget.js" charset="utf-8" id="iframe-script"/> -->
    
</main>

<style lang="scss">
    main {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    div {
        background-image: url("/paper-light.png");
        margin: 1rem 0;
        max-width: 700px;
        width: 100%;
        border-radius: 16px;
        min-height: calc(100vh - var(--header-height) - 3rem);

        background-image: url("/paper-light.png");
        position: relative;

        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4);
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

    main {
        :global(iframe) {
            mix-blend-mode: multiply;
            width: 100%;
            border: none;
            min-height: 100%;
        }
    }
</style>
