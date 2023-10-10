import { ProductItem } from "../molecules/ProductItem";
import { type ProductBaseFragment } from "@/gql/graphql";

type RelatedProductsProps = {
	products: ProductBaseFragment[];
};

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
	return (
		<section className="pt-16">
			<h2 className="text-2xl font-bold">Similar Products</h2>
			<div className="grid grid-cols-4 gap-8" data-testid="related-products">
				{products.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</section>
	);
};
