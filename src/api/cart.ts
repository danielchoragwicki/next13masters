"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
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

async function getOrCreateCart() {
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

	await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			orderId: cartId,
			productId,
			total: product.price,
		},
		cache: "no-store",
	});
}
