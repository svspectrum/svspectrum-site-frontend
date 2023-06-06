<script lang="ts">
    import { goto } from "$app/navigation";
    import { page, session } from "$app/stores";
    import { fetchBackend } from "$lib/api/backend";
	import Doodles from "$lib/components/Doodles.svelte";
    import { setCookie } from "$lib/client/cookies";
    
    let identifier = "Speccie";
    let password = "spectrum";
    let remember = false;

    async function login() {
        const res = await fetchBackend('auth/local', "", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ identifier, password })
        });
        
        if (res.ok) {
            const {jwt} = await res.json();
            setCookie("jwt", jwt, remember ? 7 : 0);
            session.update(session => ({...session, jwt}));

            const redirected = $page.url.searchParams.get('redirected');
            if (redirected) {
                goto(redirected);
            } else {
                goto('/');
            }
        } else {
            const data: { message: { messages: { message: string }[] }[] } = await res.json();
            if (data?.message?.[0]?.messages?.[0]?.message) {
                alert(data.message[0].messages[0].message);
            }
        }
    }
</script>

<svelte:head>
    <title>Log in</title>
</svelte:head>

<main>
	<Doodles/>
    <form on:submit|preventDefault={login}>
        {#if $page.url.searchParams.has('redirected')}
        <div class="error">Deze pagina is alleen zichtbaar voor leden. Log in om de pagina te kunnen zien.</div>
        {/if}

        <label for="identifier"><b>Gebruikersnaam</b></label>
        <input type="text" placeholder="" name="identifier" required bind:value={identifier}>

        <label for="password"><b>Wachtwoord</b></label>
        <input type="password" placeholder="wachtwoord?" name="password" required bind:value={password}>

        <button type="submit">Log in</button>
        <label>
            <input type="checkbox" bind:checked={remember} name="remember"> Houd mij ingelogt (gebruikt cookies)
        </label>
    </form>
</main>

<style lang="scss">
    main {
        display: grid;
        justify-items: center;
        align-content: center;
    }

    form {
        max-width: calc(60ch);
        padding: 1rem;
        width: 100%;
    }

    .error {
        color: red;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 1em 1.5em;
        // margin: 8px 0;
        display: block;
        border: 1px solid #ccc;
    }

    button {
        font: inherit;
        border: 1px var(--text-color-white) solid;
        color: var(--text-color-white);
        border-radius: .5em;
        padding: .5em;
        box-shadow: var(--primary-color) 0px 4px 0px;
        background-color: var(--primary-color);
        transform: translate(0px, -3px);
        width: 100%;

        &:hover, &:active {
            box-shadow: var(--primary-color) 0px 2px 0px;
            transform: translate(0px, -1px);
        }

        transition-timing-function: linear;
        transition: transform .1s, box-shadow .1s, background-color .1s;
        
        margin: calc(1rem + 4px) 0 0 0;
        cursor: pointer;
    }

    label {
        display: block;
        
        &:not(:first-child) {
            margin-top: 1rem;
        }
    }
</style>