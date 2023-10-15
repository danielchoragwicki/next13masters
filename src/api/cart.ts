"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { executeGraphql } from "../utils/executeGraphql";
import {
	CartAddProductDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
} from "../gql/graphql";

export async function addProductToCartAction(formData: FormData) {
	const productId = formData.get("productId");

	if (typeof productId === "string") {
		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, productId);

		revalidateTag("cart");
	}
}

export async function getOrCreateCart() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const { order: cart } = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-store",
		});
		if (cart) {
			return cart;
		}
	}

	const { createOrder: newCart } = await executeGraphql({
		query: CartCreateDocument,
		cache: "no-store",
	});
	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, { httpOnly: true, sameSite: "lax" });
	return newCart;
}

async function addProductToCart(cartId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
		cache: "no-store",
	});
	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	const { order: cart } = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		cache: "no-store",
	});

	const orderItem = cart?.orderItems.find((item) => item.product?.id === productId);

	await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			orderId: cartId,
			productId,
			total: product.price,
			quantity: (orderItem?.quantity ?? 0) + 1,
			orderItemId: orderItem?.id ?? "",
		},
		cache: "no-store",
	});
}

export async function handleStripePaymentAction() {
	"use server";

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const cart = await getOrCreateCart();
	if (!cart) {
		return;
	}

	// @ts-expect-error FIXME
	const session = await stripe.checkout.sessions.create({
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems
			.map((item) =>
				item.product
					? {
							price_data: {
								currency: "usd",
								product_data: {
									name: item.product.name,
									description: item.product.description,
									images: item.product.images.map((i) => i.url),
								},
								unit_amount: item.product.price,
							},
							quantity: item.quantity,
					  }
					: null,
			)
			.filter(Boolean),
		mode: "payment",
		success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cart/canceled`,
	});
	if (session.url) {
		cookies().set("cartId", "");
		redirect(session.url);
	}
}
