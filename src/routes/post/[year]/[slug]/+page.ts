import { error } from '@sveltejs/kit';

// POST PAGE
    import { getPost } from "$lib/api/post";

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
    export async function load({ params, session }) {
	const slug = `/post/${params.year}/${params.slug}`
	let {res, post} = await getPost(slug, session.jwt);

	if (res.ok) {
		if (post) {
			return {
				post
			};
		}
	} else {
		throw error(500, `database error`);
	}
}
