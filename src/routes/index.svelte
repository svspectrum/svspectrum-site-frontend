<script lang="ts" context="module">
	import { getNews } from "$lib/api/news";
	import { getRelevant } from "$lib/api/relevant";

    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ page, fetch, session, context }) {
		let {res: resNews, news} = await getNews();
		let {res: resRelevant, relevant} = await getRelevant();

		if (resNews.ok && resRelevant.ok) {
			if (news) {
				return {
					props: {
						news,
						relevant
					}
				};
			}
		} else {
			return {
				status: resNews.status,
				error: new Error(`database error`)
			};
		}
	}
</script>

<script lang="ts">
    import type { INewsData } from "$lib/api/news";
	import type { IRelevantData } from "$lib/api/relevant";

    import NewsTree from "$lib/components/NewsTree.svelte";
	import Relevant from "$lib/components/Relevant.svelte";
	import Welcome from "$lib/components/Welcome.svelte";
    
    export let news: INewsData[];
	export let relevant: IRelevantData[];
</script>

<svelte:head>
    <title>Studievereniging Spectrum</title>
</svelte:head>

<Relevant relevant={relevant}/>

<main>
	<Welcome />
    <NewsTree news={news}/>
</main>