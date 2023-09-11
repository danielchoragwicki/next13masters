import { type ProductItemType } from "@/types";
import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({ product }: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-4 flex justify-between">
			<div>
				<h3 className="text-sm text-gray-700">
					<a href={"#"}>
						<span aria-hidden="true" className="absolute inset-0" />
						{product.name}
					</a>
				</h3>
				<p className="mt-1 text-sm text-gray-500">{product.category}</p>
			</div>
			<p className="text-sm font-medium text-gray-900">{formatMoney(product.price)}</p>
		</div>
	);
};
