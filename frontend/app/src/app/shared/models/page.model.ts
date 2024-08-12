
export interface Page {
    "count": number,
    "total":  number,
    "page_size": number,
    "current": number,
    "previous": string | null,
    "next": string | null,
    "results": any,
}
