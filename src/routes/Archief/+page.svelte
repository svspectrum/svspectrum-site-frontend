<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// // ARCHIVE PAGE
    import { getArchive } from "$lib/api/archive";

	// /**
	//  * @type {import('@sveltejs/kit').Load}
	//  */
    export async function load({ params, session }) {
	// 	let {res, archive} = await getArchive(session.jwt);

	// 	if (res.ok) {
	// 		if (archive) {
	// 			return {
	// 				props: {
	// 					archive
	// 				}
	// 			};
	// 		}
	// 	} else {
	// 		return {
	// 			status: res.status,
	// 			error: new Error(`database error`)
	// 		};
	// 	}
	// }
</script>

<script lang="ts">
    throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import Doodles from "$lib/components/Doodles.svelte";
    import type { IArchiveData } from "$lib/api/archive";
    import Image from "$lib/components/Image.svelte";
    
    export let archive: IArchiveData;
</script>

<svelte:head>
    <title>Archief</title>
</svelte:head>

<main>
	<Doodles/>
	<div>
		{#each archive.content as content}
			{#if content.type == 'title'}
				<h1>{content.title}</h1>
			{:else if content.type == 'subtitle'}
				<h2>{content.title}</h2>
			{:else if content.type == 'link'}
				<a rel="external" target="_blank" href={content.url} download={content.download}><Image image={content.image} /></a>
			{/if}
		{/each}
	</div>
</main>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: [start] repeat(auto-fit, minmax(calc(30vh + 4rem), 1fr)) [end];

		margin: 1rem;
		column-gap: 2rem;
  		row-gap: 1rem;
		max-width: min(120ch, 100vw - 2rem);
	}

	a {
		aspect-ratio: 1 / 1.4142;

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

	h1, h2 {
		grid-column-start: start;
		grid-column-end: end;
		margin: 0;
	}
</style>