import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { ProductListItemImage } from "../atoms/ProductListItemImage";
import { type ProductBaseFragment } from "@/gql/graphql";

type ProductItemProps = {
	product: ProductBaseFragment;
};

export const ProductItem = ({ product }: ProductItemProps) => {
	return (
		<li key={product.id} className="group relative">
			<ProductListItemImage product={product} />
			<ProductListItemDescription product={product} />
		</li>
	);
};
