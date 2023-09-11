import { type ProductItemType } from "@/types";
import { ProductList } from "@/ui/organisms/ProductList";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "category 1",
		coverImage: {
			alt: "alt 1",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		},
		name: "Product 1",
		price: 100,
	},
	{
		id: "2",
		category: "category 2",
		coverImage: {
			alt: "alt 2",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
		},
		name: "Product 2",
		price: 200,
	},
	{
		id: "3",
		category: "category 3",
		coverImage: {
			alt: "alt 3",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
		},
		name: "Product 3",
		price: 300,
	},
	{
		id: "4",
		category: "category 4",
		coverImage: {
			alt: "alt 4",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
		},
		name: "Product 4",
		price: 400,
	},
];

export default function Home() {
	return (
		<section className="mx-auto h-screen max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<ProductList products={products} />
		</section>
	);
}
