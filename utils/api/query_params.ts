import { isEmpty } from 'lodash';
export {}


/**
 * @name getQueryParams
 * @description Gets query params from a url
 * @param {string} url
 * @returns {{
 *  type: string,
 *  id: string
 *  start: number
 *  page_count: number
 * }} query params
 */

export const getQueryParams = (url: string): {
    type: string,
    id: string,
    start: number,
    page_count: number
} => {
    // we are in the backend
    let all_params = url.split("?")[1]
    let params = all_params.split("&")
    let [
        type,
        id,
        start,
        page_count
    ] = params?.map((param) => param.split("=")[1])

    return {
        type,
        id,
        start: !isEmpty(start) ? parseInt(start) : 0,
        page_count: !isEmpty(page_count) ? parseInt(page_count) : 10
    }
}