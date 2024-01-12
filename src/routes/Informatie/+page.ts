import { error } from '@sveltejs/kit';

// INFO PAGE
import { getInfo } from "$lib/api/info";

    /**
 * @type {import('@sveltejs/kit').PageLoad}
 */
    export async function load({ session }) {   
	let {res, info} = await getInfo(session.jwt);

	if (res.ok) {
		if (info) {
			return {
				info
			};
		}
	} else {
		throw error(500, `database error`);
	}
}
