import { fetchBackend } from "./backend";
import { type IEventData, parseEvent } from "./event";
import { type IPostData, parsePost } from "./post";
import { createResponseParser } from "./response";

export type INewsData = IEventData | IPostData

export async function getNews(jwt: string) {
    const path = 'news';
    const res = await fetchBackend(path, jwt);
    let news: INewsData[];

    if (res.ok) {
        const json = await res.json()
        news = parseNewsItem(json);
    }

    return {res, news};
}

export const parseNewsItem = createResponseParser((item: INewsData) => {
    if (item.type == "event") {
        return parseEvent(item);
    } else if (item.type == "post") {
        return parsePost(item);
    }
});
