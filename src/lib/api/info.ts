import dayjs from 'dayjs';
import type { Dayjs } from "dayjs";
import { type IPageData, parsePage } from './page';
import { fetchBackend } from './backend';
import { createResponseParser } from './response';

export interface IInfoData {
    id: number;
    createdAt: Dayjs;
    updatedAt: Dayjs;
    categories: {
        id: number;
        title: string;
        subcategories: {
            id: number;
            title: string;
            pages: IPageData[];
        }[];
    }[];
}

export async function getInfo(jwt: string) {
    const path = 'info?populate[categories][populate][subcategories][populate]=*';
    const res = await fetchBackend(path, jwt);
    let info : IInfoData;
    
    if (res.ok) {
        const json = await res.json();
        info = parseInfo(json.data);
    }

    return {res, info};
}

export const parseInfo = createResponseParser((info: any) => {
    if (typeof info === 'object' && info !== null) {
        let parsed : IInfoData = info;

        parsed.createdAt = dayjs(parsed.createdAt);
        parsed.updatedAt = dayjs(parsed.updatedAt);
        
        for (const category of parsed.categories) {
            for (const subcategory of category.subcategories) {
                subcategory.pages = parsePage(subcategory.pages);
                subcategory.pages.sort((a, b) => a.title.localeCompare(b.title));
            }
        }

        return parsed;
    } else {
        return null;
    }
});