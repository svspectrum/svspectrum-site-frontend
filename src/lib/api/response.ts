export function createResponseParser(parser) {
    return (data: any) => parseResponse(parser, data);
}

export function parseResponse(parser, data: any) {
    const flat = flattenResponse(data);

    if (Array.isArray(flat)) {
        return flat.map(parser);
    } else {
        return parser(flat);
    }
}

export function flattenResponse(data: any) {
    if (Array.isArray(data)) {
        return data.map(flattenResponse);
    }
    
    if (typeof data === 'object' && data !== null) {
        if ('data' in data) {
            return flattenResponse(flattenObject(data, 'data'));
        }
        if ('attributes' in data) {
            return flattenResponse(flattenObject(data, 'attributes'));
        }
        if (Object.keys(data).length === 0) {
            return null;
        }
    }

    return data;
}

function flattenObject(data: any, key: any) {
    if (Array.isArray(data[key])) {
        return data[key];
    } else {
        let flat = {...data, ...data[key]};
        delete flat[key]
        return flat;
    }
}
