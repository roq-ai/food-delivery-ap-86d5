const mapping: Record<string, string> = {
  companies: 'company',
  deliveries: 'delivery',
  orders: 'order',
  'order-items': 'order_item',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
