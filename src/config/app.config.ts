interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Customer Service Representative', 'End Customer'],
  tenantName: 'Company',
  applicationName: 'food delivery application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage company information', 'Manage products', 'View orders', 'View delivery details'],
  getQuoteUrl: 'https://app.roq.ai/proposal/069a0045-444d-483b-997f-55e5ec39b5b6',
};
