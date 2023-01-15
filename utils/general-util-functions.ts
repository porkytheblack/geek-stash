

/**
 * @name generate_random_number 
 * @description generate random number
 * @param min
 * @param max
 */

export const generate_random_number = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}