<script lang="ts">
    // Importeer de dayjs-bibliotheek voor datum- en tijdmanipulatie.
    import dayjs from "dayjs";
    // Importeer het "Doodles" component.
    import Doodles from "./Doodles.svelte";

    // Bepaal de huidige maand met behulp van dayjs.
    let month = dayjs().month();
</script>

<div>
    <!-- Inclusie van het "Doodles" component met één "amount" prop. -->
    <Doodles amount={1}/>
    <h1>
        {#if (month >= 5 && month <= 7)}
            <!-- Conditioneel blok op basis van de huidige maand (mei t/m juli). -->
             Ga jij Bèta-gamma of FPS doen?
             <!-- Een link naar de "Eerstejaarsdagen" als aan de voorwaarde is voldaan. -->
             <a href="/Eerstejaarsdagen">Kom naar onze eerstejaarsdagen!</a>
        {:else}
            <!-- Alternatief bericht als de maand niet in mei t/m juli valt. -->
            Welkom bij studievereniging spectrum!
            <!-- Een link om lid te worden als de voorwaarde niet wordt voldaan. -->
            <a href="/Word-Lid">Wil je lid worden?</a>
        {/if}
    </h1>
</div>

<style lang="scss">
    div {
        /* Stel de hoogte van het welkomstgedeelte in met behulp van CSS-variabelen. */
        --welcome-height: calc(100vh - max(25vw, 40vh) - var(--header-height) - 2rem - 12px);
        display: flex;
        position: relative;

        flex-direction: column;
        align-content: center;
        justify-content: center;
        text-align: center;

        text-shadow: 0px 2px 2px white;
        min-height: var(--welcome-height);
    }

    a {
        /* Zorg ervoor dat links inline-blokken zijn voor een juiste weergave. */
        display: inline-block;
    }
</style>
