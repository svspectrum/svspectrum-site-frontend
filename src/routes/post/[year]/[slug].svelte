<script lang="ts" context="module">
	// POST PAGE
    import { getPost } from "$lib/api/post";

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ page, fetch, session, context }) {
		const slug = `post/${page.params.year}/${page.params.slug}`
		let {res, post} = await getPost(slug);

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
    
    export let post: IPostData;
</script>

<main>
	<Article markdown={post.content} title={post.title}/>
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