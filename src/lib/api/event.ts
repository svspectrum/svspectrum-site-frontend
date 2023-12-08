import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { type IImageData, parseImage } from "./image";
import { fetchBackend } from "./backend";
import { type IPostData, parsePost } from "./post";
import { createResponseParser } from "./response";

export interface IEventData {
    // Beschrijft hoe EventData eruit ziet
    type: "event";
    id: number;
    title: string;
    description:string;
    packing_list: string;
    price: string;
    extra_info: string;
    url: string;
    publishedAt: Dayjs;
    createdAt: Dayjs;
    updatedAt: Dayjs;
    parts: {
        id: number;
        title: string;
        location: string;
        begin: Dayjs;
        end: Dayjs;
    }[];
    enrol: {
        id: number;
        title: string;
        url: string;
        deadline: Dayjs|null;
        limit: number;
        open: boolean;
    }[];
    updates?: IPostData[];
    image: IImageData;
    begin: Dayjs;
    end: Dayjs;
}

export async function getEvent(url : string, jwt: string) {
    // Sorteer op bepaalde events op basis van url
    const path = `events?filters[url][$eq]=${url}&populate=*`;
    const res = await fetchBackend(path, jwt);
    let event : IEventData;

    // Haal event uit de database
    if (res.ok) {
        const json = await res.json();
        event = parseEvent(json.data)[0];
    }

    return {res, event};
}

export const parseEvent = createResponseParser((event: any) => { 
    if (typeof event === 'object' && event !== null) {
        let parsed : IEventData = {...event};
        
        parsed.publishedAt = dayjs(parsed.publishedAt);
        parsed.createdAt = dayjs(parsed.createdAt);
        parsed.updatedAt = dayjs(parsed.updatedAt);
        
        if (parsed.parts) {
            for (const part of parsed.parts) {
                part.begin = dayjs(part.begin);
                part.end = dayjs(part.end);

                if (!parsed.begin || parsed.begin.isAfter(part.begin)) {
                    parsed.begin = part.begin
                }
                if (!parsed.end || parsed.end.isAfter(part.end)) {
                    parsed.end = part.begin
                }
            }
        }
        
        if (parsed.enrol) {
            for (const enrol of parsed.enrol) {
                enrol.deadline = dayjs(enrol.deadline);
            }
        }

        parsed.updates = parsePost(parsed.updates)
        
        parsed.image = parseImage(parsed.image)

        return parsed;
    } else {
        return null;
    }
});