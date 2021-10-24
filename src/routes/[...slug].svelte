<script lang="ts" context="module">
	import { getPage } from "$lib/api/page";
	// PAGE PAGE

    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ page, fetch, session, context }) {
		const slug = page.params.slug;
		let {res, page: article} = await getPage(slug);

		if (res.ok) {
			if (article) {
				return {
					props: {
						article: article
					}
				};
			}
		} else {
			return {
				status: res.status,
				error: new Error(`Could not load ${slug}`)
			};
		}
	}
</script>

<script lang="ts">
    import Article from "$lib/components/Article.svelte";
	import Doodles from "$lib/components/Doodles.svelte";

    export let article: any;
</script>

<svelte:head>
    <title>{article.title}</title>
</svelte:head>

<main>
	<Doodles/>
	<Article title={article.title}>{@html article.content}</Article>
</main>

<style lang="scss">
    :global {
        main {
            display: grid;
            justify-items: center;
			align-content: start;
        }
    }
</style>