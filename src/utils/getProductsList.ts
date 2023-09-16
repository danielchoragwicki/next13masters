import { type Product, type ProductResponse } from "@/types";

export const getProductsList = async (offset: number): Promise<Product[]> => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=20&offset=${offset}`);

	const productsResponse = (await res.json()) as ProductResponse[];

	return productsResponse.map(transformProduct);
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
