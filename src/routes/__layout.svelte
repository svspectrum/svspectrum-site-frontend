<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <link rel="stylesheet" href="https://use.typekit.net/mxd1uyk.css">
</svelte:head>

<Header />

<div class="outer-main">
    <slot></slot>
</div>

<Footer />

<style lang="scss">
    :global {
        * {
            margin: 0;
            padding: 0;
        }

        html {
            font-size: 1.1rem;
            font-family: ff-uberhand-pro-2,sans-serif;
            font-weight: 200;
            font-style: normal;
            line-height: 1.5;
            background-color: #005f7f;
            scrollbar-color:  #005f7f8a #d0e2e7;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: lint-mccree,sans-serif;
            font-weight: 400;
            font-style: normal;

            &:not(:first-child) {
                margin-top: 2rem;
            }
        }

        p, table, ul, ol {
            &:not(:first-child) {
                margin-top: 1rem;
            }
        }

        li {
            margin-left: 1rem;
            &:not(:first-child) {
                margin-top: 0rem;
            }
        }

        a {
            color: #005f7f;
            text-decoration: inherit;

            &:hover {
                text-decoration: underline;
            }
        }

        #svelte {
            display: grid;
            min-height: 100vh;
            grid-template-rows: auto 1fr auto;
        }

        .outer-main {
            display: grid;
            grid-template-rows: auto 1fr;
        }

        main {
            background-image: url("/paper.png");
            position: relative;

            &::before, &::after {
                content: "";

                position: absolute;
                left: 0;
                right: 0;
                height: 30px;
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
