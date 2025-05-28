

export function getEightHours() {
    const now = new Date();
    const eightHoursLater = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    return eightHoursLater;
}

export function IsExpired(date) {
    const today = new Date();
    if(today > date)
        return 'expired'
    return undefined;
}