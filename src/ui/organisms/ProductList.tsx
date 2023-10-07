import { ProductItem } from "@/ui/molecules/ProductItem";
import { type ProductBaseFragment } from "@/gql/graphql";

type ProductListProps = {
	products: ProductBaseFragment[];
};

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<div className="grid grid-cols-4 gap-8" data-testid="products-list">
			{products.map((product) => (
				<ProductItem key={product.id} product={product} />
			))}
		</div>
	);
};
