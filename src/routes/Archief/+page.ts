import { error } from '@sveltejs/kit';

// ARCHIVE PAGE
    import { getArchive } from "$lib/api/archive";

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
    export async function load({ params, session }) {
	let {res, archive} = await getArchive(session.jwt);

	if (res.ok) {
		if (archive) {
			return {
				archive
			};
		}
	} else {
		throw error(500, `database error`);
	}
}
