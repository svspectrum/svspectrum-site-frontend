<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { getPage } from "$lib/api/page";
	// // PAGE PAGE

    /**
	//  * @type {import('@sveltejs/kit').Load}
	//  */
    export async function load({ url, params, session }) {
	// 	const pageUrl = `/${params.url}`;
	// 	let {res, page: article} = await getPage(pageUrl, session.jwt);

	// 	if (res.ok) {
	// 		if (article) {
	// 			return {
	// 				props: {
	// 					article: article
	// 				}
	// 			};
	// 		}
	// 	} else if (res.status == 401) {
	// 		let redirect = "/Log-In?redirected=" + url.pathname;
	// 		
	// 		try {
	// 			const json = await res.json();
	// 			redirect = json?.redirect ?? redirect;
	// 		} catch (e) {}
	// 		
	// 		return {
	// 			status: 302,
	// 			redirect: redirect
	// 		}
	// 	} else {
	// 		return {
	// 			status: res.status,
	// 			error: new Error(`Could not load ${url}`)
	// 		};
	// 	}
	// }
</script>

<script lang="ts">
    throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

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