import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { type IImageData, parseImage } from "./image";
import { fetchBackend, getBackendURL } from "./backend";
import { createResponseParser, flattenResponse } from "./response";

export interface IArchiveTitleData {
    type: "title" | "subtitle";
    id: number;
    title: string;
}

export interface IArchiveFileData {
    type: "link";
    id: number;
    title: string;
    image: IImageData;
    url: string;
    download?: string;
}

export interface IArchiveData {
    id: number;
    content: (IArchiveTitleData | IArchiveFileData)[];
    createdAt: Dayjs;
    updatedAt: Dayjs;
}

export async function getArchive(jwt: string) {
    const path = `archive?populate[content][populate]=image,file`;
    const res = await fetchBackend(path, jwt);
    let archive : IArchiveData;

    if (res.ok) {
        const json = await res.json();
        archive = parseArchive(json.data);
    }

    return {res, archive};
}

export const parseArchive = createResponseParser((archive: any) => { 
    if (typeof archive === 'object' && archive !== null) {
        let parsed = {...archive};
        
        parsed.createdAt = dayjs(parsed.createdAt);
        parsed.updatedAt = dayjs(parsed.updatedAt);
        
        for (const id in parsed.content) {
            const content = parsed.content[id]
            let parsedContent : any = {id: content.id, title: content.title};

            if (content.__component == "archive.title") {
                parsedContent.type = "title";
            } else if (content.__component == "archive.subtitle") {
                parsedContent.type = "subtitle";
            } else if (content.__component == "archive.file") {
                const file = flattenResponse(content.file);

                parsedContent.type = "link";
                parsedContent.image = parseImage(content.image);
                parsedContent.url = getBackendURL(file.url);
                parsedContent.download = file.name;
            } else if (content.__component == "archive.link") {
                parsedContent.type = "link";
                parsedContent.image = parseImage(content.image);
                parsedContent.url = content.url;
            } else {
                throw "found unknown content type in archive data";
            }

            parsed.content[id] = parsedContent;
        }

        return parsed;
    } else {
        return null;
    }
});