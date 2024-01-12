<script lang="ts" context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// // EVENT PAGE
	// import { getEvent } from "$lib/api/event";

	// /**
	//  * @type {import('@sveltejs/kit').Load}
	//  */
    export async function load({ params, session }) {
	// 	const url = `/event/${params.year}/${params.slug}`
	// 	let {res, event} = await getEvent(url, session.jwt);

	// 	if (res.ok) {
	// 		if (event) {
	// 			return {
	// 				props: {
	// 					event: event
	// 				}
	// 			};
	// 		}
	// 	} else {
	// 		return {
	// 			status: res.status,
	// 			error: new Error(`database error`)
	// 		};
	// 	}
	// }
</script>

<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import type { IEventData } from "$lib/api/event"

    import Article from "$lib/components/Article.svelte";
	import Doodles from "$lib/components/Doodles.svelte";
	import HeaderImageHolder from "$lib/components/HeaderImageHolder.svelte";
	import Image from "$lib/components/Image.svelte";
	import { onMount } from "svelte";
	import { getPageVisitState, visitPage } from "$lib/client/visited";

    export let event: IEventData;

	$: updates = event.updates.map(update => ({
		update,
		visitState: getPageVisitState(update)
	}));

	onMount(() => {
		visitPage(event.url);
	});
</script>

<svelte:head>
    <title>{event.title}</title>
</svelte:head>

<HeaderImageHolder>
	<Image image={event.image}/>
	<h1 slot="top">{event.title}</h1>
</HeaderImageHolder>

<main>
	<Doodles/>
	<div>
		{#if updates.length > 0}
		<Article title="Updates" class="updates">
			<ul class="eventposts">
				{#each updates as {update, visitState}}
					<li>
						{#if !visitState.visited && visitState.recentlyPublished}
							<div class="new subnote">nieuw</div>
						{:else if !visitState.visitedSinceUpdate && visitState.visited}
							<div class="updated subnote">geüpdatet</div>
						{/if}
						<a href={update.url}>{update.title}</a> - {update.publishedAt.format("DD MMM YY")}
					</li>
				{/each}
			</ul>
		</Article>
		{/if}
		<Article title="Beschrijving" class="description">{@html event.description}</Article>
		{#if event.parts.length > 0}
		<Article title="Onderdelen" class="parts">
			<table>
				{#each event.parts as part}
					{#if part.title}
						<tr><th colspan="2">{part.title}</th></tr>
					{/if}
					<tr>
						<td>{part.location}</td>
						<td>van {part.begin.format("D MMM YYYY H:mm")}<br/>tot {part.end.format("D MMM YYYY H:mm")}</td>
					</tr>
				{/each}
			</table>
		</Article>
		{/if}
		{#if event.enrol.length > 0}
		<Article title="Inschrijven" class="enrol">
			<table>
				{#each event.enrol as enrol}
					<tr>
						<td><a href={enrol.url}>{enrol.title}</a></td>
						<td>
							{#if enrol.deadline.isValid()}
								Inschrijven voor {enrol.deadline.format("D MMM YYYY H:mm")}{(enrol.limit > 0) ? ", " : ""}
							{/if}
							{#if enrol.limit > 0}
								{enrol.limit}&nbsp;plekken
							{/if}
						</td>
					</tr>
				{/each}
			</table>
		</Article>
		{/if}
		{#if event.price && event.price.trim() != ""}
			<Article title="Prijs" class="price">{@html event.price}</Article>
		{/if}
		{#if event.packing_list && event.packing_list.trim() != ""}
			<Article title="Meenemen" class="packing-list">{@html event.packing_list}</Article>
		{/if}
		{#if event.extra_info && event.extra_info.trim() != ""}
			<Article title="Extra Informatie" class="extra-info">{@html event.extra_info}</Article>
		{/if}
	</div>
</main>

<style lang="scss">
	@use "sass:math";

	main {
		--max-columns: 1;

		display: grid;
		// align-content: start;
		// align-items: start;
		 
		grid-auto-flow: dense;

		&>div {
			display: grid;
			align-content: start;
			justify-content: center;
			align-items: start;
			grid-auto-flow: dense;
			max-width: min(100vw, 190ch);

			grid-template-columns: [start] repeat(auto-fit, minmax(min(50ch, 100vw), 1fr)) [end];
		}

		:global {
			.image-header {
				grid-column: start / end;
			}

			article.description {
				grid-column: min(1, var(--max-columns));
			}
			article.updates {
				grid-column: min(2, var(--max-columns));
			}
			article.parts, article.enrol {
				grid-column: min(3, var(--max-columns));
			}
		}
	}

	@media only screen and (min-width: 100ch) {
		main {
			--max-columns: 2;
		}
	}
	
	@media only screen and (min-width: 150ch) {
		main {
			--max-columns: 3;
		}
	}

	.new {
        --sticker-color: rgb(205, 0, 0);
    }

    .updated {
        --sticker-color: rgb(230, 130, 0);
    }

    .subnote {
        color: white;
        background: var(--sticker-color);
        border-radius: 1em;
        border: .2em rgb(247, 247, 247) solid;
        box-shadow: 0px 0px 4px 0px #00000047;
        line-height: 1.8;

		display: inline-block;
        padding: 0 .4em;
        height: 1.6em;
        border-radius: 1em;
        font-size: .85rem;
        line-height: 1.4;
        
    }

	table {
		width: 100%;
		border-collapse: collapse;
	}

	tr:not(:last-child) td {
		padding-bottom: 1em;
	}

	td:last-child {
		text-align: right;
	}

	h1 {
		position: absolute;
		bottom: 5%;
		left: 50%;
		color: white;
		transform: translate(-50%, 0);
		margin: 0;
		text-align: center;
	}
</style>