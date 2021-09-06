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

<svelte:head>
    <title>{event.title}</title>
</svelte:head>

<HeaderImageHolder>
	<Image image={event.image}/>
	<h1 slot="top">{event.title}</h1>
</HeaderImageHolder>

<main>
	<Article markdown={event.description} title="Beschrijving" class="desc"/>
	<Article markdown={event.info} title="Praktische Informatie" class="info"/>
	<Article title="Onderdelen" class="parts">
		<table>
			{#each event.parts as part}
				<tr>
					<td>{part.title}</td>
					<td>{part.location}</td>
					<td>van {part.begin.format("D MMM YYYY H:mm")}<br/>tot {part.end.format("D MMM YYYY H:mm")}</td>
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

	h1 {
		position: absolute;
		bottom: 5%;
		left: 50%;
		color: white;
		transform: translate(-50%, 0);
		margin: 0;
	}
</style>