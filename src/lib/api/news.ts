import { fetchBackend } from "./backend";
import { IEventData, parseEvent } from "./event";
import { IPostData, parsePost } from "./post";

export type INewsData = IEventData | IPostData

export async function getNews() {
    const path = 'news';
    const res = await fetchBackend(path);
    
    let news: INewsData[];
    if (res.ok) {
        news = (await res.json()).map(parseNewsItem);
    }

    return {res, news};
}

export function parseNewsItem(item: INewsData) {
    if (item.type == "event") {
        return parseEvent(item);
    } else if (item.type == "post") {
        return parsePost(item);
    }
}
