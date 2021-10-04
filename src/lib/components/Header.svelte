<script lang="ts">
import { onMount } from "svelte";


    let menuIsOpen = false;
    let subMenuIsOpen = false;
    let subMenuButton : HTMLAnchorElement;

    function closeMenus() {
        menuIsOpen = false;
        subMenuIsOpen = false;
    }

    function toggleMenu() {
        menuIsOpen = !menuIsOpen;
    }

    function toggleSubMenu() {
        subMenuIsOpen = !subMenuIsOpen;
    }

    function closeSubMenu(e) {
        if (!subMenuButton.contains(e.target)) {
            subMenuIsOpen = false;
        }
    }

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

<svelte:window on:click={closeSubMenu} on:sveltekit:navigation-end={closeMenus}/>

<header bind:clientWidth={width}>
    <nav>
        <ul class="menu" class:active={menuIsOpen}>
            <li class="logo"><a href="/"><img src="/logo.svg" alt="Spectrum"/></a></li>
            <li class="item"><a href="/">Nieuws</a></li>
            <li class="item"><a href="/Agenda">Agenda</a></li>
            <li class="item"><a href="/Informatie">Informatie</a></li>
            <li class="item has-submenu" class:submenu-active={subMenuIsOpen}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a tabindex="0" on:click={toggleSubMenu} bind:this={subMenuButton}>Bibliotheek</a>
                <ul class="submenu">
                    <li class="subitem"><a href="/Tentamens">Tentamens</a></li>
                    <li class="subitem"><a href="/Boekenverkoop">(Boeken) Winkel</a></li>
                    <li class="subitem"><a href="/Fotos">Foto's</a></li>
                    <li class="subitem"><a href="/Archief">Archief</a></li>
                    <li class="subitem"><a href="/Vacatures">Vacatures</a></li>
                </ul>
            </li>
            <li class="item button"><a href="/Log-In">Log In</a></li>
            <li class="item button secondary"><a href="/Word-Lid">Word Lid</a></li>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <li class="toggle"><a href="" on:click={toggleMenu}><i class="fas fa-bars" class:fa-bars={!menuIsOpen} class:fa-times={menuIsOpen}></i></a></li>
        </ul>
    </nav>
    <svg>
        {#each marks as mark}
            <line x1={mark.pos} x2={mark.pos} y1={15} y2={15-mark.size*10} stroke-width={mark.size*2}/>
        {/each}
    </svg>
</header>

<style lang="scss">
    :root {
        --header-line-height: 1em;
        --header-height: calc(3rem + var(--header-line-height));
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

    header {
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        background-color: var(--primary-color-transparent);
        backdrop-filter: contrast(100%) blur(10px);
    }

    nav {
        flex: 1;
        padding: 0 15px;
        color: white;
        max-width: 1400px;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style-type: none;
        margin: 0;
    }

    li {
        margin: 0;
    }

    .item, .subitem {
        > a {
            // padding: 1.5rem 1rem;

            &:hover {
                background: rgba(0, 0, 0, 0.11);
            }
        }
    }

    .has-submenu {
        user-select: none;
    }
    
    // .item.button {
    //     padding: .25em;
    // }

    /* Mobile menu */
    .menu {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        &.active {
            margin-bottom: 15px;
        }

        li a {
            display: block;
            padding: .5em;
        }

        li.logo {
            a {
                display: flex;
                padding: 0;
                img {
                    height: var(--header-height);
                }
            }
        }

        li.toggle a {
            padding: 1em;
        }

        // li.subitem a {
        //     padding: 15px;
        // }
    }
    
    .toggle {
        order: 1;
        font-size: 1em;
    }
    .item.button {
        order: 2;
    }
    .item {
        order: 3;
        width: 100%;
        text-align: center;
        display: none;
    }
    .active .item {
        display: block;
    }
    .button.secondary {
        /* divider between buttons and menu links */
        border-bottom: 2px white solid;
    }
    /* Submenu up from mobile screens */
    .submenu {
        display: none;
    }
    .submenu-active .submenu {
        display: block;
    }
    .has-submenu > a::after {
        font-family: "Font Awesome 5 Free";
        font-size: .75em;
        line-height: 1em;
        font-weight: 900;
        content: "\f078";
        padding-left: 5px;
    }
    .subitem a {
        padding: 10px 15px;
    }
    .submenu-active {
        // background-color: var(--primary-color-transparent);;
        background: white;
        color: black;
    }

    /* Tablet menu */
    @media all and (min-width: 700px) {
        .menu {
            justify-content: center;
        }
        .logo {
            flex: 1;
        }
        .item.button {
            width: auto;
            order: 1;
            display: block;
        }
        .toggle {
            flex: 1;
            text-align: right;
            order: 2;
        }
        /* Button up from tablet screen */
        .menu li.button a {
            padding: .3em .7em;
        }
        .button.secondary {
            border: 0;
        }
        .button a {
            --border-radius: .5em;
            border: 1px white solid;
            box-shadow: var(--primary-color) 0px 4px 0px;
            transform: translate(0px, -3px);

            &:hover, &:active {
                box-shadow: var(--primary-color) 0px 2px 0px;
                transform: translate(0px, -1px);
            }
            transition-timing-function: linear;
            transition: transform .1s, box-shadow .1s, background-color .1s;
        }
        .button:not(.secondary) a {
            background: white;
            color: black;
            border-radius: var(--border-radius) 0 0 var(--border-radius);

            &:hover, &:active {
                background: #eee;
            }
        }
        .button.secondary a {
            background-color: var(--primary-color);
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
            margin-left: -1px;
        }
    }
    /* Desktop menu */
    @media all and (min-width: 960px) {
        .menu {
            // align-items: stretch;
            flex-wrap: nowrap;
            
            &.active {
                margin-bottom: 0;
            }
        }
        .logo {
            order: 0;
        }
        .item:not(.button) {
            order: 1;
            position: relative;
            display: inline;
            width: auto;
            height: var(--header-height);
            

            &>a {
                display: flex;
                align-items: center;
                height: 100%;
                vertical-align: middle;
                padding: 0 1em;
            }
        }
        .button {
            order: 2;

            &:not(.secondary) {
                margin-left: .5em;
            }
        }

        .submenu-active {
            background: none;
            color: inherit;
        }

        .submenu-active .submenu {
            display: block;
            position: absolute;
            left: 0;
            top: 100%;
            background: white;
            color: black;
            box-shadow: #00000099 0px 2px 6px;
        }
        .toggle {
            display: none;
        }
    }
</style>