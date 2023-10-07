"use client";

import Image from "next/image";
import {
	ProductPageByIdQuery,
	type ProductBaseFragment,
	ProductSize,
	ProductColor,
} from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { useEffect, useState } from "react";

type ProductDetailsProps = {
	product: ProductPageByIdQuery["product"];
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const [size, setSize] = useState<ProductSize>();
	const [color, setColor] = useState<ProductColor>();

	if (!product) return null;

	const firstImage = product.images?.[0];
	const possibleColors = product.variants
		.filter((variant) =>
			variant.__typename === "ProductSizeColorVariant" ? variant.size === size : false,
		)
		.map((variant) =>
			variant.__typename === "ProductSizeColorVariant" ? variant.color : undefined,
		);

	return (
		<div className="hero bg-base-200 mt-16 rounded-xl p-16">
			<div className="hero-content w-full flex-col gap-16 lg:flex-row">
				{firstImage && (
					<Image
						className="max-w-sm rounded-lg shadow-2xl"
						alt={product.name}
						height={firstImage.height ?? 0}
						src={firstImage.url ?? ""}
						width={firstImage.width ?? 0}
					/>
				)}
				<div className="grid flex-auto gap-6">
					<h1 className="flex gap-4 align-top text-5xl font-bold">
						{product.name}
						<div className="badge badge-secondary">{formatMoney(product.price)}</div>
					</h1>
					<p>{product.description}</p>
					<div>
						<div className="divider">SIZE</div>
						<div className="join">
							{product.variants.map(
								(variant) =>
									variant.__typename === "ProductSizeColorVariant" && (
										<input
											aria-label={variant.size}
											checked={variant.size === size}
											className="join-item btn"
											name={variant.size}
											onClick={() => setSize(variant.size)}
											type="radio"
										/>
									),
							)}
						</div>
						{!!possibleColors.length && (
							<>
								<div className="divider">COLOR</div>
								<div className="join">
									{possibleColors.map((color) => (
										<input
											aria-label={color}
											checked={color === color}
											className="join-item btn"
											name={color}
											onClick={() => setColor(color)}
											type="radio"
										/>
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
