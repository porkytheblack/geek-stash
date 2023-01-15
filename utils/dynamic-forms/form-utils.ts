
/**
 * @name parse_query
 * @params {string} query
 * @returns {
 *  type?: "rpc" | "query",
 *  query?: string,
 *  fn?: string,
 *  params?: Array<string>
 * }
 */

export const parse_query = (query: string): { type?: "rpc" | "query", query?: string, fn?: string, params?: Array<string> } => {
    if (query.startsWith("type:rpc=")) {
        const [fn, params] = query.replace("type:rpc=", "").split("=");
        return {
            type: "rpc",
            fn,
            params: params?.split(",") || []
        }
    }
    return {
        type: "query",
        query
    }
}