import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getDeliveryById, updateDeliveryById } from 'apiSdk/deliveries';
import { deliveryValidationSchema } from 'validationSchema/deliveries';
import { DeliveryInterface } from 'interfaces/delivery';
import { OrderInterface } from 'interfaces/order';
import { getOrders } from 'apiSdk/orders';

function DeliveryEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<DeliveryInterface>(
    () => (id ? `/deliveries/${id}` : null),
    () => getDeliveryById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DeliveryInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDeliveryById(id, values);
      mutate(updated);
      resetForm();
      router.push('/deliveries');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<DeliveryInterface>({
    initialValues: data,
    validationSchema: deliveryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Deliveries',
              link: '/deliveries',
            },
            {
              label: 'Update Delivery',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Delivery
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.delivery_address}
            label={'Delivery Address'}
            props={{
              name: 'delivery_address',
              placeholder: 'Delivery Address',
              value: formik.values?.delivery_address,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.delivery_city}
            label={'Delivery City'}
            props={{
              name: 'delivery_city',
              placeholder: 'Delivery City',
              value: formik.values?.delivery_city,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.delivery_state}
            label={'Delivery State'}
            props={{
              name: 'delivery_state',
              placeholder: 'Delivery State',
              value: formik.values?.delivery_state,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.delivery_postal_code}
            label={'Delivery Postal Code'}
            props={{
              name: 'delivery_postal_code',
              placeholder: 'Delivery Postal Code',
              value: formik.values?.delivery_postal_code,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.delivery_country}
            label={'Delivery Country'}
            props={{
              name: 'delivery_country',
              placeholder: 'Delivery Country',
              value: formik.values?.delivery_country,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<OrderInterface>
            formik={formik}
            name={'order_id'}
            label={'Select Order'}
            placeholder={'Select Order'}
            fetcher={getOrders}
            labelField={'status'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/deliveries')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'delivery',
    operation: AccessOperationEnum.UPDATE,
  }),
)(DeliveryEditPage);
