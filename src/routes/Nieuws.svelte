<script lang="ts" context="module">
	// EVENT PAGE
	import { getNews } from "$lib/api/news";

    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ page, fetch, session, context }) {
		let {res, news} = await getNews();

		if (res.ok) {
			if (news) {
				return {
					props: {
						news
					}
				};
			}
		} else {
			return {
				status: res.status,
				error: new Error(`database error`)
			};
		}
	}
</script>

<script lang="ts">
    import type { INewsData } from "$lib/api/news";

    import HeaderImageHolder from "$lib/components/HeaderImageHolder.svelte";
    import NewsTree from "$lib/components/NewsTree.svelte";
    
    export let news: INewsData[];
</script>

<HeaderImageHolder>
	<!-- <Image image={event.image}/> -->
</HeaderImageHolder>

<main>
    <NewsTree news={news}/>
</main>