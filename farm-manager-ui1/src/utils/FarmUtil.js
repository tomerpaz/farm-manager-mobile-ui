export function getUserDisplayName(user){
    return `${user.firstName} ${user.lastName} (${user.username}) `;
}

export function isBaseUser(user){
   return user.role === 'baseGrower'

}