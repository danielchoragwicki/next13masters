import { ProductItem } from "../molecules/ProductItem";
import { type ProductBaseFragment } from "@/gql/graphql";

type RelatedProductsProps = {
	products: ProductBaseFragment[];
};

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
	return (
		<section data-testid="related-products">
			{products.map((product) => (
				<ProductItem key={product.id} product={product} />
			))}
		</section>
	);
};
