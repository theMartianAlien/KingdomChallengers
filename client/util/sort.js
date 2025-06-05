export function sortByProperty(arr, column, ascending = true) {
    if(column.length === 0)
        return arr;
    return [...arr].sort((a, b) => {
        const valueA = a[column]?.toUpperCase();
        const valueB = b[column]?.toUpperCase();
        if (valueA < valueB) {
            return ascending ? -1 : 1;
        }
        if (valueA > valueB) {
            return ascending ? 1 : -1;
        }
        return 0;
    });
}