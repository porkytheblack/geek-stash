

/**
 * @name generate_random_number 
 * @description generate random number
 * @param min
 * @param max
 */

export const generate_random_number = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @name truncate_string
 * @description truncate string
 * @param str
 * @param length
 */

export const truncate_string = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
}


/**
 * @name get_nested_object_value
 * @description get nested object value
 * @param obj
 * @param path
 * @param defaultValue
 * @example
 * const obj = {
 * a: {
 *  b: {
 *      c: 1
 *      }
 *  }
 * }
 * 
 * get_nested_object_value(obj, 'a.b.c') // 1
 * get_nested_object_value(obj, ['a', 'b', 'c']) // 1
 * get_nested_object_value(obj, 'a.b.c.d', 'default') // 'default'
 * 
 */

export const get_nested_object_value = (obj: any, path: string | string[], defaultValue?: any) => {
    const pathArray = Array.isArray(path) ? path : path.split(".");
    return pathArray.reduce((obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : defaultValue), obj);
}