import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { IImageData } from "./image";
import { fetchBackend } from "./backend";

export interface IEventData {
    type: "event";
    id: number;
    title:string;
    description:string;
    info: string;
    slug: string;
    published_at: Dayjs;
    created_at: Dayjs;
    updated_at: Dayjs;
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
        spots: number;
        open: boolean;
    }[];
    image: IImageData;
}

export async function getEvent(slug : string) {
    const path = `events?slug=${slug}`;
    const res = await fetchBackend(path);
    let event;
    if (res.ok) {
        event = parseEvent((await res.json())[0]);
    }

    return {res, event};
}

export function parseEvent(event: IEventData) {
    if (event) {
        let parsed : IEventData = {...event};
        parsed.published_at = dayjs(parsed.published_at);
        parsed.created_at = dayjs(parsed.created_at);
        parsed.updated_at = dayjs(parsed.updated_at);

        for (const part of parsed.parts) {
            part.begin = dayjs(part.begin);
            part.end = dayjs(part.end);
        }

        for (const enrol of parsed.enrol) {
            enrol.deadline = dayjs(enrol.deadline);
        }

        return parsed;
    } else {
        return event;
    }
}