/**
 * Flatten specified array of arrays.
 */
export function flattenArray(arrays: any[][]): any[] {
    return [].concat.apply([], arrays);
}
