export function parseFloat2(value, defaultValue) {

    if(value){
        return parseFloat(value).toFixed(2);
    }
    return defaultValue;
}

export function numberInputValidation(value){
   return /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(value)
}

export const numberFormatter = (value, n, x) =>{
    if(!value){
        return 0;
    }
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

// export const numberFormatter = (number, fractionDigits = 0, thousandSeperator = ',', fractionSeperator = '.') => {
//     if (number!==0 && !number || !Number.isFinite(number)) return number
//     const frDigits = Number.isFinite(fractionDigits)? Math.min(Math.max(fractionDigits, 0), 7) : 0
//     const num = number.toFixed(frDigits).toString()

//     const parts = num.split('.')
//     let digits = parts[0].split('').reverse()
//     let sign = ''
//     if (num < 0) {sign = digits.pop()}
//     let final = []
//     let pos = 0

//     while (digits.length > 1) {
//         final.push(digits.shift())
//         pos++
//         if (pos % 3 === 0) {final.push(thousandSeperator)}
//     }
//     final.push(digits.shift())
//     return `${sign}${final.reverse().join('')}${frDigits > 0 ? fractionSeperator : ''}${frDigits > 0 && parts[1] ? parts[1] : ''}`
// }