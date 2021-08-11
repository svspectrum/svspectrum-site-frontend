<script lang="ts" context="module">
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	 export function load({ error, status }) {
		return {
			props: {
				status: status,
				message: error.message,
			}
		};
	}
</script>

<script lang="ts">
    import Article from "$lib/components/Article.svelte";

    export let status: number;
	export let message: string;
	$: console.log(status, message);
</script>

<main>
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