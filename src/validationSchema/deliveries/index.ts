import * as yup from 'yup';

export const deliveryValidationSchema = yup.object().shape({
  delivery_address: yup.string().required(),
  delivery_city: yup.string().required(),
  delivery_state: yup.string().required(),
  delivery_postal_code: yup.string().required(),
  delivery_country: yup.string().required(),
  order_id: yup.string().nullable().required(),
});
