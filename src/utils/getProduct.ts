import { type Product, type ProductResponse } from "@/types";

export const getProduct = async (id: string): Promise<Product> => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);

	const productsResponse = (await res.json()) as ProductResponse;

	return transformProduct(productsResponse);
};

const transformProduct = (product: ProductResponse): Product => ({
	id: product.id,
	name: product.title,
	price: product.price,
	description: product.description,
	category: product.category,
	image: product.image,
	rating: product.rating,
	longDescription: product.longDescription,
});
