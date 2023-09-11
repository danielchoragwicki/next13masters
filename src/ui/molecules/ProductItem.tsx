import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { ProductListItemImage } from "../atoms/ProductListItemImage";
import { type ProductItemType } from "@/types";

type ProductItemProps = {
	product: ProductItemType;
};

export const ProductItem = ({ product }: ProductItemProps) => {
	return (
		<li key={product.id} className="group relative">
			<ProductListItemImage product={product} />
			<ProductListItemDescription product={product} />
		</li>
	);
};
