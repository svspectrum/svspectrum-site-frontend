import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { fetchBackend } from "./backend";
import { type IEventData, parseEvent } from "./event";
import { createResponseParser } from "./response";

export interface IPostData {
    type: "post";
    title: string;
    content: string;
    url: string;
    event?: IEventData;
    publishedAt: Dayjs;
    createdAt: Dayjs;
    updatedAt: Dayjs;
    begin: Dayjs;
    end: Dayjs;
}

export async function getPost(url : string, jwt: string) {
    const path = `posts?filters[url][$eq]=${url}&populate[event][populate]=image`;
    const res = await fetchBackend(path, jwt);
    let post : IPostData;

    if (res.ok) {
        const json = await res.json();
        post = parsePost(json.data)[0];
    }

    return {res, post}
}

export const parsePost = createResponseParser((post: any) => {
    if (typeof post === 'object' && post !== null) {
        let {attributes, ...other} = post;
        let parsed : IPostData = {...other, ...attributes};
        
        if (parsed.event) {
            parsed.event = parseEvent(parsed.event);
        }

        parsed.publishedAt = dayjs(post.publishedAt);
        parsed.createdAt = dayjs(post.createdAt);
        parsed.updatedAt = dayjs(post.updatedAt);

        parsed.begin = parsed.publishedAt;
        parsed.end = parsed.begin.add(7, 'day');

        return parsed;
    } else {
        return null;
    }
});
