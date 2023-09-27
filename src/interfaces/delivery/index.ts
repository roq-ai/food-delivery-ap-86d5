import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface DeliveryInterface {
  id?: string;
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  delivery_postal_code: string;
  delivery_country: string;
  order_id: string;
  created_at?: any;
  updated_at?: any;

  order?: OrderInterface;
  _count?: {};
}

export interface DeliveryGetQueryInterface extends GetQueryInterface {
  id?: string;
  delivery_address?: string;
  delivery_city?: string;
  delivery_state?: string;
  delivery_postal_code?: string;
  delivery_country?: string;
  order_id?: string;
}
