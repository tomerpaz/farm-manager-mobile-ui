export const required = (value,allValues,props) => (value == null ||  0 === value.length ? 'Required' : undefined)

export const requiredPositiveNumber = (value,allValues,props) => (!isPositivNumber(value)  ? 'Required' : undefined)


export const userNameValidation = (value,allValues,props) => (value == null ||  value.length < 6 ? 'Required' : undefined)

export const passwordValidation = (value,allValues,props) => (validPassword(value) ? undefined : 'Required')

export const requiredEmailValidation = (value,allValues,props) => (value && emailIsValid(value) ? undefined : 'Required')

export const nonRequiredEmailValidation = (value,allValues,props) => (!value || emailIsValid(value) ? undefined : 'Required')

export const passwordVerifyValidation = (value,allValues,props) => (validPassword(value) && value === props.newPassword ? undefined : 'Required')


function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

function validPassword (password) {
   return password && password.length > 5
    //return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
  }

 export function isPositivNumber (value) {
    const num = Number(value)
    console.log('num, ' +num);
    return num && num > 0;
  }

  export function hasError(value){
    if(value === null || value === undefined){
      return false;
    } else {
      return true;
    }
  }