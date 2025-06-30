/**
 * Returns the current hour.
 * @returns {number} The current hour (0-23).
 */
export function getCurrentHour(): number {
    const now = new Date();
    return now.getHours();
}
