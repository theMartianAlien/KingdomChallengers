export function getFormattedDate(date) {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    })
}