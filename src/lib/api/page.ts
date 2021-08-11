import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { fetchBackend } from "./backend";

export interface IPageData {
    id: number;
    title: string;
    content: string;
    parent?: IPageData | number;
    slug: string;
    published_at: Dayjs;
    created_at: Dayjs;
    updated_at: Dayjs;
}

export async function getPage(slug: string) {
    const path = `pages?slug=${slug}`;
    const res = await fetchBackend(path);
    let page : IPageData;

    if (res.ok) {
        page = parsePage((await res.json())[0]);
    }

    return {res, page}
}

export function parsePage(page: any) {
    if (typeof page === 'object' && page !== null) {
        let parsed : IPageData = {...page};
        parsed.published_at = dayjs(parsed.published_at);
        parsed.created_at = dayjs(parsed.created_at);
        parsed.updated_at = dayjs(parsed.updated_at);

        parsed.parent = parsePage(parsed.parent);

        return parsed;
    } else {
        return page;
    }
}