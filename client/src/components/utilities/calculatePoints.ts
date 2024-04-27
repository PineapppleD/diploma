export function calculatePoints (answers: boolean[]) {
    const points = answers.filter(item  => item === true).length;

    return points
}