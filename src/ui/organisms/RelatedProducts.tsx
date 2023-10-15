import { ProductList } from "./ProductList";
import { type ProductBaseFragment } from "@/gql/graphql";

type RelatedProductsProps = {
	products: ProductBaseFragment[];
};

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
	return (
		<section className="pt-16">
			<h2 className="text-2xl font-bold">Similar Products</h2>
			<ProductList products={products} testId="related-products" />
		</section>
	);
};
