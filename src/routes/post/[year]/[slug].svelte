<script lang="ts" context="module">
	// POST PAGE
    import { getPost } from "$lib/api/post";

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ params, session }) {
		const slug = `/post/${params.year}/${params.slug}`
		let {res, post} = await getPost(slug, session.jwt);

		if (res.ok) {
			if (post) {
				return {
					props: {
						post
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
    import Article from "$lib/components/Article.svelte";
    import type { IPostData } from "$lib/api/post";
	import Doodles from "$lib/components/Doodles.svelte";
	import HeaderImageHolder from "$lib/components/HeaderImageHolder.svelte";
	import Image from "$lib/components/Image.svelte";
	import { onMount } from "svelte";
	import { visitPage } from "$lib/client/visited";
    
    export let post: IPostData;

	onMount(() => {
		visitPage(post.url);
	});
</script>

<svelte:head>
    <title>{post.title}</title>
</svelte:head>

{#if post.event}
<HeaderImageHolder>
	<Image image={post.event.image}/>
	<h1 slot="top"><a href={post.event.url}>&gt;&nbsp;{post.event.title}&nbsp;&lt;</a></h1>
</HeaderImageHolder>
{/if}

<main>
	<Doodles/>
	<Article title={post.title}>{@html post.content}</Article>
</main>

<style lang="scss">
	main {
		display: grid;
		justify-items: center;
		align-content: start;
	}

	h1 {
		position: absolute;
		bottom: 5%;
		left: 50%;
		transform: translate(-50%, 0);
		margin: 0;
		text-align: center;

		a {
			color: var(--text-color-white)
		}
	}
</style>