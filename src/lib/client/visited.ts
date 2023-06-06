import { browser } from "$app/env";
import dayjs, { Dayjs } from "dayjs";
const storageKey = "visits"

export function visitPage(path: string) {
    let visits = getPageVisits();

    visits[path] = dayjs();

    window.localStorage.setItem(storageKey, JSON.stringify(visits));
}

export function getPageVisitState({url, publishedAt, updatedAt}) {
    const recentlyPublished = dayjs().diff(publishedAt, 'weeks') < 2;
    const recentlyUpdated = dayjs().diff(updatedAt, 'weeks') < 1;

    if (!browser) {
        return {visited: true, visitedSinceUpdate: true, recentlyPublished, recentlyUpdated}
    }

    const visits = getPageVisits();
    const visit = visits[url];
    
    if (visit === undefined) {
        return {visited: false, visitedSinceUpdate: false, recentlyPublished, recentlyUpdated}
    } else {
        const visitedSinceUpdate = dayjs(visit).isAfter(updatedAt);

        return {visited: true, visitedSinceUpdate, recentlyPublished, recentlyUpdated}
    }
}

export function getPageVisits() {
    if (!browser) {
        return {}
    }

    try {
        return JSON.parse(window.localStorage.getItem(storageKey)) ?? {};
    } catch (e) {
        console.warn(e);
        return {}
    }
}
