import { ProductItem } from "../molecules/ProductItem";
import { type Product } from "@/types";

type ProductListProps = {
	products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<ul
			className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
			data-testid="products-list"
		>
			{products.map((product) => (
				<ProductItem key={product.id} product={product} />
			))}
		</ul>
	);
};
