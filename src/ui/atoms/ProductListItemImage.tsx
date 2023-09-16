import { type Product } from "@/types";

type ProductListItemImageProps = {
	product: Product;
};

export const ProductListItemImage = ({ product }: ProductListItemImageProps) => {
	return (
		<div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
			<img
				src={product.image}
				className="h-full w-full object-cover object-center lg:h-full lg:w-full"
			/>
		</div>
	);
};
