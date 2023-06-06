import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { fetchBackend } from "./backend";
import { type IEventData, parseEvent } from "./event";
import { createResponseParser } from "./response";

export type IRelevantData = IRelevantEnrolData | IRelevantPartData;

export interface IRelevantBaseData {
    type: string;
    title: string;
    score: number;
    reason: string;
    event: IEventData;
}

export interface IRelevantEnrolData extends IRelevantBaseData {
    type: "enrol";
    reason: "deadline" | "spots";
    url: string;
    deadline: Dayjs;
    spots: number;
    open: boolean;
}

export interface IRelevantPartData extends IRelevantBaseData {
    type: "part";
    reason: "begin";
    location: string;
    begin: Dayjs;
    end: Dayjs;
}

export async function getRelevant(jwt: string) {
    const path = 'relevant';
    const res = await fetchBackend(path, jwt);
    
    let relevant : IRelevantData[];
    if (res.ok) {
        relevant = (await res.json()).map(parseRelevant);
    }

    return {res, relevant}
}

export const parseRelevant = createResponseParser((relevant: any) => {
    if (typeof relevant === 'object' && relevant !== null) {
        let parsed : IRelevantData = {...relevant};

        parsed.event = parseEvent(parsed.event);

        if (parsed.type == 'enrol') {
            parsed.deadline = dayjs(parsed.deadline);
        } else {
            parsed.begin = dayjs(parsed.begin);
            parsed.end = dayjs(parsed.end);
        }

        return parsed;
    }
});