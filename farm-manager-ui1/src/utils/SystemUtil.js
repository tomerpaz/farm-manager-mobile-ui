export const FINANCIAL_BUSINESS_ADMIN = 'exporterEnterprise';
export const BUSINESS_ADMIN = 'businessAdmin';

export const APPROVER = 'approver';

const BUSINESS_ADMINS = [FINANCIAL_BUSINESS_ADMIN,BUSINESS_ADMIN]

export function isBusinessAdminFunc(role){
    return BUSINESS_ADMINS.includes(role)
}