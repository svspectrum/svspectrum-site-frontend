import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { createResponseParser } from "./response";

export interface IImageData { 
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: { 
        [key: string]: { 
            name: string;
            hash: string;
            ext: string;
            mime: string;
            width: number;
            height: number;
            size: number;
            path: any;
            url: string;
        };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: any;
    provider: string;
    provider_metadata: any;
    createdAt: Dayjs;
    updatedAt: Dayjs;
    placeholder: string;
}

export const parseImage = createResponseParser((image: any) => {
    if (typeof image === 'object' && image !== null) {
        let parsed : IImageData = {...image};

        parsed.createdAt = dayjs(parsed.createdAt);
        parsed.updatedAt = dayjs(parsed.updatedAt);

        return parsed;
    } else {
        return null;
    }
});