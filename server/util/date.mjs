

export function getEightHours() {
    const now = new Date();
    const eightHoursLater = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    return eightHoursLater;
}