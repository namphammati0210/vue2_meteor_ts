export function findFreeId(array: number[]) {

    const sortedArray: number[] = array
        .slice() // Make a copy of the array.
        .sort(function (a, b) {
            return a - b
        }); // Sort it.

    let previousId: number = 0;
    for (let element of sortedArray) {
        if (element != (previousId + 1)) {
            // Found a gap.
            return previousId + 1;
        }
        previousId = element;
    }
    // Found no gaps.
    return previousId + 1;
}