import { stripe } from "@/lib/stripe";

export default async function Cart(){
    stripe.charges.retrieve('ch_3MjSGhE7TMviQOgJ1DwFuYsH', {
        stripeAccount: 'acct_1LdnWiE7TMviQOgJ'
      });

      
    return (
        <div>
           cart
            </div>
    )
}