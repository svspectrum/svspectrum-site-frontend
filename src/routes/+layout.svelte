<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { beforeNavigate } from "$app/navigation";

    beforeNavigate(navigation => {
        // Bypass SvelteKits internal navigation when navigating to files or the backend
        if (navigation.to) {
            const path = navigation.to.pathname;
            const hasExtension = path.search(/\..+/g) != -1;
            const fromBackend = path.search(/^\/?backend\//g) != -1;

            if (hasExtension) {
                const link = document.createElement("a");
                link.setAttribute("download", "");
                link.href = navigation.to.toString();
                document.body.appendChild(link);
                link.click();
                link.remove();

                navigation.cancel();
            } else if (fromBackend) {
                location.assign(navigation.to);
            }
        }
    });


</script>

<svelte:head>
    <link rel="stylesheet" href="https://use.typekit.net/mxd1uyk.css">
    <link rel="shortcut icon" href="/favicon.ico">
	<link rel="icon" sizes="16x16 32x32 64x64" href="/favicon.ico">
	<link rel="icon" type="image/png" sizes="196x196" href="/favicon-192.png">
	<link rel="icon" type="image/png" sizes="160x160" href="/favicon-160.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
	<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
	<link rel="apple-touch-icon" href="/favicon-57.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/favicon-114.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/favicon-72.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/favicon-144.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/favicon-60.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/favicon-120.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/favicon-76.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png">
    <link rel="preload" href="/paper.png" as="image">
    <link rel="preload" href="/torn-paper-top.png" as="image">
    <link rel="preload" href="/torn-paper-bottom.png" as="image">
	<meta name="msapplication-TileColor" content="#FFFFFF">
	<meta name="msapplication-TileImage" content="/favicon-144.png">
	<meta name="msapplication-config" content="/browserconfig.xml">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://kit.fontawesome.com/ca925cf2da.js" crossorigin="anonymous"></script>
    <meta name="theme-color" content="#0080a2"/>
</svelte:head>

<Header />

<div class="outer-main">
    <slot></slot>
</div>

<Footer />

<!-- <img class="under-construction" src="/underconstruction.png" alt="site word aan gewerkt"> -->

<style lang="scss">
    :global {
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            --primary-color: #0080a2;
            --primary-color-transparent: #0080a28a;
            --secondary-color: #4ab3d6;
            --secondary-color-transparent: #4ab3d630;
            --text-color-main: #2d2d2d;
            --text-color-header: #0a0a0a;
            --text-color-white: #ffffff;
            
            font-size: 1.0rem;
            font-family: adobe-handwriting-tiffany, sans-serif;
            font-weight: 400;
            font-style: normal;
            line-height: 1.6;
            letter-spacing: 0.02em;
            background-color: var(--primary-color);
            scrollbar-color:  var(----primary-color-transparent) #d0e2e7;
            overflow-x: hidden;
            color: var(--text-color-main);

        }

        h1, h2, h3, h4, h5, h6 {
            color: var(--text-color-header);
            font-family: lint-mccree,sans-serif;
            font-weight: 400;
            font-style: normal;
            line-height: 1.2em;

            &:not(:first-child) {
                margin-top: 2rem;
            }
        }

        p, table, ul, ol {
            &:not(:first-child) {
                margin-top: 1rem;
            }
        }

        em, strong {
            font-weight: 700;
        }

        li {
            margin-left: 1rem;
            &:not(:first-child) {
                margin-top: 0rem;
            }
        }

        a {
            color: var(--primary-color);
            text-decoration: inherit;

            &:hover {
                text-decoration: underline;
            }
        }

        #svelte {
            display: grid;
            min-height: 100vh;
            grid-template-rows: 1fr auto;
        }

        .outer-main {
            z-index: 1;
            display: grid;
            grid-template-rows: auto 1fr;

            &>:first-child {
                padding-top: var(--header-height);
            }
        }

        main {
            background-image: url("/paper.png");
            position: relative;
            grid-row: span 2;
            z-index: -1;

            & > * {
                z-index: 0;
            }

            &::before, &::after {
                content: "";

                position: absolute;
                left: 0;
                right: 0;
                height: 30px;
                z-index: 0;
            }

            &::before {
                bottom: 100%;

                background: url("/torn-paper-top.png");
            }

            &::after {
                top: 100%;

                background: url("/torn-paper-bottom.png");
            }
        }
    }
</style>
