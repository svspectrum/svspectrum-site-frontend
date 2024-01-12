import { error } from '@sveltejs/kit';

import { getNews } from "$lib/api/news";
import { getRelevant } from "$lib/api/relevant";

    /**
 * @type {import('@sveltejs/kit').PageLoad}
 */
    export async function load({ session }) {
	let {res: resNews, news} = await getNews(session.jwt);
	let {res: resRelevant, relevant} = await getRelevant(session.jwt);

	if (resNews.ok && resRelevant.ok) {
		if (news) {
			return {
				news,
				relevant
			};
		}
	} else {
		throw error(500, `database error`);
	}
}
