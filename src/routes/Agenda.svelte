<script context="module">
	// export const ssr = false;
</script>

<script lang="ts">
    import { onMount } from 'svelte';

    let calendarElement: HTMLElement;

    onMount(async () => {
        // Start black magic code hell:
        if (!window.ICAL) {
            window.ICAL = undefined; // Make sure the global ICAL is defined... by making it undefined...
        }

        await import('@fullcalendar/core/vdom'); // Import this just so the 'order' is right...

        // Import all packages
        const fullCalendarPromise = import("@fullcalendar/core"); 
        const daygridPluginPromise = import("@fullcalendar/daygrid");
        const timegridPluginPromise = import("@fullcalendar/timegrid");
        const listPluginPromise = import("@fullcalendar/list");
        const localeNLPluginPromise = import("@fullcalendar/core/locales/nl");
        const iCalendarPluginPromise = import("@fullcalendar/icalendar");

        // Wait for all the packages
        const fullCalendar = await fullCalendarPromise; // This one has no default unlike its plugins...
        const daygridPlugin = (await daygridPluginPromise).default;
        const timegridPlugin = (await timegridPluginPromise).default;
        const listPlugin = (await listPluginPromise).default;
        const localeNLPlugin = (await localeNLPluginPromise).default.default;
        const iCalendarPlugin = (await iCalendarPluginPromise).default;
        // End black magic code hell

        console.log(localeNLPlugin);

        let calendar = new fullCalendar.Calendar(calendarElement, {
            plugins: [
                daygridPlugin,
                iCalendarPlugin,
                timegridPlugin,
                listPlugin,
            ],
            events: {
                url: '/agenda.ics',
                format: 'ics',
                color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
            },
            headerToolbar: {
                start: 'dayGridMonth,timeGridWeek,listMonth',
                center: 'title',
                end: 'today prev,next'
            },
            locale: localeNLPlugin,
            titleRangeSeparator: " tot ",
        });

        calendar.render();
    });
</script>

<svelte:head>
    <title>Spectrum Agenda</title>
</svelte:head>

<main>
    <div id="calendar" bind:this={calendarElement}></div>
    <div class="calendar-info">De Spectrum agenda toevoegen aan je eigen agenda? <a href="/Agenda-Synchroniseren">Klik hier!</a></div>
</main>

<style lang="scss">
    #calendar {
        --fc-event-text-color: #ffffff;
        --fc-button-bg-color: var(--primary-color);
        --fc-list-event-hover-bg-color: rgba(0, 0, 0, 0.1);
        --fc-today-bg-color: var(--secondary-color-transparent);
        width: 100%;
        padding: 1rem;
        height: calc(100vh - 7rem);
    }

    .calendar-info {
        font-size: 1.3rem;
        line-height: 2rem;
    }

    :global {
        #calendar.fc {
            .fc-button {
                border: none;
            }

            .fc-list-sticky .fc-list-day > * {
                background: none;
            }

            .fc-col-header {
                background-color: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3));
            }
        }
    }

    :global(#calendar.fc .fc-button) {
        border: none;
    }
</style>