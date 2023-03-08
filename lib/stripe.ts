import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_API!, {
  apiVersion: '2022-11-15',
});

const createCustomer = async () => {
  const params: Stripe.CustomerCreateParams = {
    description: 'test customer',
  };

  const customer: Stripe.Customer = await stripe.customers.create(params);

  console.log(customer.id);
};
createCustomer();