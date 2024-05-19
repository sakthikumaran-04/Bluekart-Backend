import stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
// Initialize Stripe with your secret key
const stripeInstance = new stripe(`${process.env.STRIPE_SECRET}`);

// Define your payment endpoint handler
export const payment = async (req, res) => {
  try {
    // Destructure the products array from the request body
    const { products } = req.body;
    const id = uuidv4();
    const token = id.substring(0, 5);
    // Create line items for the session
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100), // Amount should be in cents
      },
      quantity: product.quantity,
    }));

    // Create a Checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.HOST}/#/success/${token}`,
      cancel_url: `${process.env.HOST}/#/cancel/${token}`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    });

    // Return the session ID to the client
    res.json({ id: session.id, token: token });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error processing payment:", error.message);
    res.status(500).json({ error: "Failed to process payment" });
  }
};
