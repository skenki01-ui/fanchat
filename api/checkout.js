import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){

if(req.method !== "POST"){
return res.status(405).end();
}

const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "payment",
line_items: [
{
price_data: {
currency: "jpy",
product_data: {
name: "100ポイント",
},
unit_amount: 100,
},
quantity: 1,
},
],
success_url: `${req.headers.origin}/home`,
cancel_url: `${req.headers.origin}/home`,
});

res.json({ id: session.id });

}