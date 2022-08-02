const nested = ['field.name','variety.category','variety.name']
export function desc(a, b, orderBy) {
    if (nested.includes( orderBy )) {
        const values = orderBy.split('.');        
        const nesterdValueA = a[values[0]] ?  a[values[0]][values[1]] : null;
        const nesterdValueB = b[values[0]] ?  b[values[0]][values[1]] : null;
        if (nesterdValueB < nesterdValueA) {
            return -1;
        }
        if (nesterdValueB > nesterdValueA) {
            return 1;
        }
        return 0;
    }
    else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
}

export function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export function getTablePageRows(rows, sorting, currentPage, pageSize) {

    return stableSort(rows, getSorting(sorting.direction, sorting.columnName)).slice(currentPage * pageSize, currentPage * pageSize + pageSize)
}