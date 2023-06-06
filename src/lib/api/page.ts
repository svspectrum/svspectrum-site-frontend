import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { fetchBackend } from "./backend";
import { createResponseParser } from "./response";

export interface IPageData {
    id: number;
    title: string;
    content: string;
    parent?: IPageData | number;
    url: string;
    publishedAt: Dayjs;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}

export async function getPage(url: string, jwt: string) {
    const path = `pages?filters[url][$eq]=${url}`;
    const res = await fetchBackend(path, jwt);
    let page : IPageData;

    if (res.ok) {
        const json = await res.json();
        page = parsePage(json.data)[0];
    }

    return {res, page}
}

export const parsePage = createResponseParser((page: any) => {
    if (typeof page === 'object' && page !== null) {
        let parsed : IPageData = {...page};

        parsed.publishedAt = dayjs(parsed.publishedAt);
        parsed.createdAt = dayjs(parsed.createdAt);
        parsed.updatedAt = dayjs(parsed.updatedAt);

        parsed.parent = parsePage(parsed.parent);

        return parsed;
    } else {
        return null;
    }
});