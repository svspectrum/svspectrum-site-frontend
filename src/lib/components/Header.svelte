<script lang="ts">
    let width : number;
    let marks : {pos: number, size: number}[];

    function generateMarks(width) {
        const ppc = 96 / 2.54;
        const startPos = (width % ppc) / 2;

        let markPos = startPos;
        let marks : {pos: number, size: number}[] = [{
            pos: markPos,
            size: 1
        }];

        while (markPos + ppc <= width) {
            for (let i = 1; i <= 10; i++) {
                markPos += ppc/10;

                marks.push({
                    pos: markPos,
                    size: i == 10 ? 1 : i == 5 ? 2/3 : 1/3
                });
            }
        }

        return marks;
    }

    $: marks = generateMarks(width);
</script>

<header bind:clientWidth={width}>
    <div class="wrapper">
        <a href="/" class="logo"><img src="/logo.svg" alt="Spectrum"/></a>
        <nav>
            <a href="/Nieuws">Nieuws</a>
            <a href="/Agenda">Agenda</a>
            <a href="/Informatie">Informatie</a>
            <div class="dropdown">
                <button>Bibliotheek</button>
                <div>
                    <a href="tentamens">tentamens</a>
                    <a href="shop">(boeken) winkel</a>
                    <a href="fotos">foto's</a>
                    <a href="archief">archief</a>
                    <a href="vacatures">vacatures</a>
                </div>
            </div>
            <a href="/register" class="action">Word Lid</a>
            <a href="/login" class="action">Log In</a>
        </nav>
        <svg>
            {#each marks as mark}
                <line x1={mark.pos} x2={mark.pos} y1={15} y2={15-mark.size*10} stroke-width={mark.size*2}/>
            {/each}
        </svg>
    </div>
</header>

<style lang="scss">
    header {
        --line-height: 1em;
        --header-height: calc(3rem + var(--line-height));

        position: sticky;
        top: 0;
        width: 100%;

        display: flex;
        justify-content: center;

        min-height: var(--header-height);

        color: white;
        background-color: var(--primary-color-transparent);
        backdrop-filter: contrast(100%) blur(10px);

        z-index: 10;

        line-height: var(--line-height);

        .wrapper {
            flex-grow: 1;
            max-width: 120ch;

            display: flex;
            justify-content: space-between;
            align-items: stretch;
            flex-wrap: wrap;
        }

        .logo {
            height: var(--header-height);

            img {
                height: 100%;
            }
        }

        
    }

    nav {
        z-index: 11;
        display: flex;

        a, button {
            display: block;
            text-align: center;
            text-decoration: none;
            margin: 0;
            padding: 1.5rem 1rem;
            color: white;
            
            &:hover {
                background: rgba(0, 0, 0, 0.11)
            }

            
            &.action {
                background-color: white;
                color: black;
                padding: 0.5rem;
                margin: 1rem .5rem
            }
        }
    }

    .dropdown {
        position: relative;
        display: inline-block;

        &>button {
            background: none;
            border: none;
            color: inherit;
            font: inherit;

            &::after {
                content: "";
                border: solid white;
                border-width: 0 3px 3px 0;
                display: inline-block;
                padding: 3px;
                transform: translate(0, -3px) rotate(45deg);
                margin-left: 0.5rem;

            }
        }

        &>div {
            display: none;

            position: absolute;
            top: 100%;
            left: 0;
            min-width: 100%;

            background: white;

            a {
                color: black;
                right: 0;
                width: 100%;
                margin: 0;
                padding: 1rem .5rem;

                box-sizing: border-box;
            }
        }

        &:hover > div {
            display: block;
        }
    }

    svg {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 15px;
        width: 100%;

        line {
            stroke: white;
            opacity: .9;
        }
    }
</style>