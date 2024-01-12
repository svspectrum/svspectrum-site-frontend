<script lang="ts" context="module">
	throw new Error("@migration task: Replace error load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3293209)");

    /**
	//  * @type {import('@sveltejs/kit').Load}
	//  */
	//  export function load({ error, status }) {
	// 	return {
	// 		props: {
	// 			status: status,
	// 			message: error.message,
	// 		}
	// 	};
	// }
</script>

<svelte:head>
    <title>Oops, iets is fout gegaan &#128560;</title>
</svelte:head>

<script lang="ts">
    import Article from "$lib/components/Article.svelte";
	import Doodles from "$lib/components/Doodles.svelte";

    export let status: number;
	export let message: string;
</script>

<main>
	<Doodles/>
	<Article title={`${status}`}>{message}</Article>
</main>

<style lang="scss">
    :global {
        main {
            display: grid;
            justify-items: center;
        }
    }
</style>
