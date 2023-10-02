import Link from "next/link";
import { formatMoney } from "@/utils";
import { type ProductBaseFragment } from "@/gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductBaseFragment;
};

export const ProductListItemDescription = ({ product }: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-4 flex justify-between">
			<div>
				<h3 className="text-sm text-gray-700">
					<Link href={`/product/${product.id}`}>
						<span aria-hidden="true" className="absolute inset-0" />
						{product.name}
					</Link>
				</h3>
				{/* <p className="mt-1 text-sm text-gray-500">{product.category}</p> */}
			</div>
			<p className="text-sm font-medium text-gray-900">{formatMoney(product.price)}</p>
		</div>
	);
};
