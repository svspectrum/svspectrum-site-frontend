import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { fetchBackend } from "./backend";

export interface IPostData {
    type: "post";
    title: string;
    content: string;
    slug: string;
    published_at: Dayjs;
    created_at: Dayjs;
    updated_at: Dayjs;
}

export async function getPost(slug : string) {
    const path = `posts?slug=${slug}`;
    const res = await fetchBackend(path);
    let post : IPostData;

    if (res.ok) {
        post = parsePost((await res.json())[0]);
    }

    return {res, post}
}

export function parsePost(post: IPostData) {
    if (post) {
        let parsed : IPostData = {...post};
        parsed.published_at = dayjs(post.published_at);
        parsed.created_at = dayjs(post.created_at);
        parsed.updated_at = dayjs(post.updated_at);

        return parsed;
    } else {
        return post;
    }
}