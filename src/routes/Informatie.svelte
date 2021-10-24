<script lang="ts" context="module">
	// INFO PAGE
	import { getInfo } from "$lib/api/info";

    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ page, fetch, session, context }) {
		let {res, info} = await getInfo();

		if (res.ok) {
			if (info) {
				return {
					props: {
						info
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
    import type { IInfoData } from "$lib/api/info";
    import Doodles from "$lib/components/Doodles.svelte";
    
    export let info: IInfoData;
</script>

<svelte:head>
    <title>Informatie</title>
</svelte:head>

<main>
    <Doodles/>
    {#each info.catagory as catagory}
        <div class="category" id={`c-${catagory.title}`}>
            <h1>{catagory.title}</h1>
            <div class="subcategories">
                {#each catagory.subcatagory as subcatagory}
                    <div class="subcategory">
                        <h2>{subcatagory.title}</h2>
                        <ul>
                        {#each subcatagory.pages as page}
                            <li><a href={`/${page.slug}`}>{page.title}</a></li>
                        {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</main>

<style lang="scss">
    .category {
        margin: 2rem;
    }

    .subcategories{
        columns: 25rem 4;
        gap: 2rem;
    }

    .subcategory {
        display:inline-block;
        break-inside: avoid-column;
        
        background-image: url("/paper-light.png");
        padding: 1rem;
        margin: 1rem;
        position: relative;

        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4);
        z-index: 1;
        width: calc(100% - 2rem);
        box-sizing: border-box;

        &::before, &::after {
            content: "";
            position: absolute;
            width: 40px;
            height: 25px;
            background-color: rgba(209, 209, 209, 0.5);
            box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
        }

        &::before {
            top: 3px;
            left: 0;

            transform:translate(-50%, -50%) rotate(-50deg);
        }

        &::after {
            bottom: 0;
            right: 0;
            transform:translate(50%, 50%) rotate(-40deg);
        }
    }
</style>