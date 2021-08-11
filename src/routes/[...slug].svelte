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

    export let article: any;
</script>

<main>
	<Article markdown={article.content} title={article.title}/>
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