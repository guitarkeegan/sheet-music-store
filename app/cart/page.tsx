import { stripe } from "@/lib/stripe";

export default async function Cart(){
    stripe.charges.retrieve('ch_3MjSGhE7TMviQOgJ1DwFuYsH', {
        stripeAccount: 'acct_1LdnWiE7TMviQOgJ'
      });

      
    return (
        <div>
          <div className="flex justify-center mt-12 font-bold">
          <h1 className="text-6xl">My Cart</h1>
          </div>
           
            </div>
    )
}