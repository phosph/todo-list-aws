/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, no-param-reassign, func-names, func-names */

export default function debounce<Args extends unknown[]>(
    fn: (...args: Args) => unknown,
    wait: number,
): (...args: Args) => void {
    let t: ReturnType<typeof setTimeout> | undefined;
    return function (this: unknown, ...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}
