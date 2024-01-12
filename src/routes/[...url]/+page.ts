import { redirect, error } from '@sveltejs/kit';

import { getPage } from "$lib/api/page";
// PAGE PAGE

    /**
 * @type {import('@sveltejs/kit').PageLoad}
 */
    export async function load({ url, params, session }) {
	const pageUrl = `/${params.url}`;
	let {res, page: article} = await getPage(pageUrl, session.jwt);

	if (res.ok) {
		if (article) {
			return {
				article: article
			};
		}
	} else if (res.status == 401) {
		let redirect = "/Log-In?redirected=" + url.pathname;
		
		try {
			const json = await res.json();
			redirect = json?.redirect ?? redirect;
		} catch (e) {}
		
		throw redirect(302, redirect);
	} else {
		throw error(500, `Could not load ${url}`);
	}
}
