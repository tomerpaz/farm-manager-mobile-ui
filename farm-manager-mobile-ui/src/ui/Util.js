

const p = 1;
const fontSize= 17;

export const headerSx = { fontWeight: 'bold', padding: p, fontSize };
export const cellSx = { padding: p, fontSize };
export const cellSxLink = { padding: p, textDecoration: 'underline', color: 'blue', fontSize };
export const cellSxChange = { padding: p, color: 'green', fontWeight: 'bold', fontSize };

export const cellSxColor = (color) => {
    const val = { padding: p, fontWeight: 'bold', color, fontSize };
    return val
};
