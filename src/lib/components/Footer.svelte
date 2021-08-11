<footer>
    <div class="footer-inner">
        <div>
            <h3 class="widgettitle">Adres</h3>
            <p>Kamer B0.171<br>
            Science Park 904<br>
            1098 XH Amsterdam</p>
        </div>
        <div>
            <h3>Contact</h3>
            <p>Voor vragen:&nbsp;<a title="bestuur@svspectrum.nl" href="mailto:bestuur@svspectrum.nl">bestuur@svspectrum.nl</a></p>
            <p>Voor bedrijven:&nbsp;<a title="acquisitie@svspectrum.nl" href="mailto:acquisitie@svspectrum.nl">acquisitie@svspectrum.nl</a></p>
        </div>
        <div class="logo">
            <img src="/footer-logo.png" alt="Logo"/>
        </div>
    </div>
</footer>

<style lang="scss">


    footer {
        background-color: #313233;
        color: white;
        
        display: flex;
        justify-content: center;
        padding: calc(1rem + 9px) 0rem 1rem 0rem;

        position: sticky;
        bottom: 0;
        z-index: -2;
    }

    .footer-inner {
        flex-grow: 1;
        max-width: 134ch;
        display: flex;
        flex-flow: row-reverse wrap;
        justify-content: space-between;

        div {
           width: max-content;
           margin: 0 auto;
           padding: 1rem;
        }
    }

    .logo {
        display: flex;
        margin: 0 auto;
    }

    img {
        max-width: 300px;
        height: 100%;
        object-fit: contain;
    }

    a {
        color: white;
    }
</style>
