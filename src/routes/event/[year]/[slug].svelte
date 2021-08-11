<script lang="ts" context="module">
	// EVENT PAGE
	import { getEvent } from "$lib/api/event";

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ page, fetch, session, context }) {
		const slug = `event/${page.params.year}/${page.params.slug}`
		let {res, event} = await getEvent(slug);

		if (res.ok) {
			if (event) {
				return {
					props: {
						event: event
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
	import type { IEventData } from "$lib/api/event"

    import Article from "$lib/components/Article.svelte";
	import HeaderImageHolder from "$lib/components/HeaderImageHolder.svelte";
	import Image from "$lib/components/Image.svelte";

    export let event: IEventData;
</script>

<HeaderImageHolder>
	<Image image={event.image}/>
	<div class="shade"></div>
	<div class="color"></div>
	<h1>{event.title}</h1>
</HeaderImageHolder>

<main>
	<Article markdown={event.description} title="Beschrijving" class="desc"/>
	<Article markdown={event.info} title="Practische Informatie" class="info"/>
	<Article title="Onderdelen" class="parts">
		<table>
			{#each event.parts as part}
				<tr>
					<td>{part.title}</td>
					<td>{part.location}</td>
					<td>{part.begin.format("D MMM YYYY H:mm")} tot {part.end.format("D MMM YYYY H:mm")}</td>
				</tr>
			{/each}
		</table>
	</Article>
	<Article title="Inschrijven" class="enrol">
		<table>
			{#each event.enrol as enrol}
				<tr>
					<td><a href={enrol.url}>{enrol.title}</a></td>
					<td></td>
					<td></td>
				</tr>
			{/each}
		</table>
	</Article>
</main>

<style lang="scss">
	@use "sass:math";

	main {
		display: grid;
		align-content: start;
		align-items: start;
		grid-template-columns: [start] repeat(auto-fit, minmax(50ch,1fr)) [end]; 
		grid-template-rows: auto 1fr;

		:global {
			.image-header {
				grid-column: start / end;
			}

			article.desc, article.info {
				grid-row: span 2;
			}
		}
	}

	table {
		width: 100%;
	}
	
	.shade {
		position: absolute;
		bottom: 0;
		height: calc((5% + 3rem)*2);
		width: 100%;

		background: radial-gradient(ellipse farthest-side at bottom, rgba(0,0,0,0.5) 0%, rgba(0, 0, 0, 0) 100%);
	}

	.color {
		position: absolute;
		bottom: 0;
		height: calc((5% + 3rem)*2);
		width: 100%;

		background: linear-gradient(0deg, rgba(0,95,127,1) 20%, rgba(0,95,127,0) 100%);
		mix-blend-mode: color;
	}

	h1 {
		position: absolute;
		bottom: 5%;
		left: 50%;
		color: white;
		transform: translate(-50%, 0);
		margin: 0;
	}
</style>