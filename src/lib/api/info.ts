import dayjs from 'dayjs';
import type { Dayjs } from "dayjs";
import { IPageData, parsePage } from './page';
import { fetchBackend } from './backend';

export interface IInfoData {
    id: number;
    created_at: Dayjs;
    updated_at: Dayjs;
    catagory: {
        id: number;
        title: string;
        subcatagory: {
            id: number;
            title: string;
            pages: IPageData[];
        }[];
    }[];
}

export async function getInfo() {
    const path = 'info';
    const res = await fetchBackend(path);
    let info : IInfoData;
    
    if (res.ok) {
        info = await res.json();
    }

    return {res, info};
}

export function parseInfo(info: IInfoData) {
    if (info) {
        let parsed : IInfoData = {...info};
        parsed.created_at = dayjs(parsed.created_at);
        parsed.updated_at = dayjs(parsed.updated_at);
        
        for (const catagory of parsed.catagory) {
            for (const subcatagory of catagory.subcatagory) {
                subcatagory.pages.map(parsePage);
            }
        }

        return parsed;
    } else {
        return info;
    }
}