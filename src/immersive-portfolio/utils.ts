export function getCurrentHour(): number {
    const now = new Date();
    return now.getHours();
}
