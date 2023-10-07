import Image from "next/image";
import Link from "next/link";
import { type ProductBaseFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductItemProps = {
	product: ProductBaseFragment;
};

export const ProductItem = ({ product }: ProductItemProps) => {
	const firstImage = product.images?.[0];

	return (
		<Link
			className="card card-compact bg-base-100 shadow-xl transition-all hover:scale-105"
			href={`/product/${product.id}`}
		>
			<figure className="px-10 pt-10">
				{firstImage && (
					<Image
						alt={product.name}
						height={firstImage.height ?? 0}
						src={firstImage.url ?? ""}
						width={firstImage.width ?? 0}
					/>
				)}
			</figure>
			<div className="card-body">
				<h2 className="card-title">{product.name}</h2>
				<p>{product.categories.map((category) => category.name)?.join(", ")}</p>
				<div className="card-actions justify-end">
					<div className="badge badge-secondary">{formatMoney(product.price)}</div>
				</div>
			</div>
		</Link>
	);
};
