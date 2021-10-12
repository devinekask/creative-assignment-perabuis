// directly export the random function instead of a default export
export const random = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
}