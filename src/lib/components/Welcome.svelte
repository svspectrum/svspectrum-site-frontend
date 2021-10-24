<script>
    import Doodles from "./Doodles.svelte";
</script>

<div>
    <Doodles amount={1}/>
    <h1>
        Welkom bij studie vereniging spectrum!
        <a href="/Word-Lid">Wil je Lid worden?</a>
    </h1>
</div>

<style lang="scss">
    div {
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
        display: inline-block;
    }
</style>