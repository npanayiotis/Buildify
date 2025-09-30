/**
 * Payment Processing API
 * Handles payment processing with Stripe
 */

import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@/lib/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await requireAuth(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const {
      amount,
      currency = "usd",
      paymentMethodId,
      cart,
      domain,
      websiteId,
    } = req.body;

    if (!amount || !paymentMethodId) {
      return res
        .status(400)
        .json({ error: "Amount and payment method are required" });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      metadata: {
        userId: user.id,
        websiteId: websiteId || "",
        domain: domain || "",
        cartItems: JSON.stringify(cart || []),
      },
    });

    // Handle different payment intent statuses
    if (paymentIntent.status === "requires_action") {
      return res.status(200).json({
        success: false,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
      });
    }

    if (paymentIntent.status === "succeeded") {
      // Payment succeeded
      return res.status(200).json({
        success: true,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        message: "Payment processed successfully",
      });
    }

    // Payment failed
    return res.status(400).json({
      success: false,
      error: "Payment failed",
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Payment processing error:", error);

    if (error.type === "StripeCardError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Payment processing failed",
    });
  }
}
