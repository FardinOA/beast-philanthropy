/** YouTube helpers, safe on server and client. */
export const ytThumb = (id: string, q: "maxresdefault" | "hqdefault" = "hqdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
export const ytId = (url: string) => url.match(/(?:youtu\.be\/|v=)([\w-]{11})/)?.[1] ?? "";
