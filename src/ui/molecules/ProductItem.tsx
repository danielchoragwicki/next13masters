import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { ProductListItemImage } from "../atoms/ProductListItemImage";
import { type Product } from "@/types";

type ProductItemProps = {
	product: Product;
};

export const ProductItem = ({ product }: ProductItemProps) => {
	return (
		<li key={product.id} className="group relative">
			<ProductListItemImage product={product} />
			<ProductListItemDescription product={product} />
		</li>
	);
};
