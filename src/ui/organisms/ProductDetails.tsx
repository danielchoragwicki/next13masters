"use client";

import Image from "next/image";
import { useState } from "react";
import { AddToCartButton } from "../atoms/AddToCartButton";
import { type ProductPageByIdQuery, type ProductSize, type ProductColor } from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { addProductToCartAction } from "@/api/cart";

type ProductDetailsProps = {
	product: ProductPageByIdQuery["product"];
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
	const [size, setSize] = useState<ProductSize>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		<div className="hero mt-16 rounded-xl bg-base-200 p-16">
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
					<h1 className="align-top text-5xl font-bold">{product.name}</h1>
					<div className="badge badge-secondary">{formatMoney(product.price)}</div>
					<p>{product.description}</p>
					<div>
						{!!product.variants.length && (
							<>
								<div className="divider">SIZE</div>
								<div className="join">
									{product.variants.map(
										(variant) =>
											variant.__typename === "ProductSizeColorVariant" && (
												<input
													key={variant.id}
													aria-label={variant.size}
													checked={variant.size === size}
													className="btn join-item"
													name={variant.size}
													onClick={() => setSize(variant.size)}
													onChange={() => {}}
													type="radio"
												/>
											),
									)}
								</div>
							</>
						)}
						{!!possibleColors.length && (
							<>
								<div className="divider">COLOR</div>
								<div className="join">
									{possibleColors.map((color) => (
										<input
											key={color}
											aria-label={color}
											checked={color === color}
											className="btn join-item"
											name={color}
											onClick={() => setColor(color)}
											type="radio"
										/>
									))}
								</div>
							</>
						)}
					</div>
					<form action={addProductToCartAction}>
						<input type="text" name="productId" value={product.id} hidden onChange={() => {}} />
						<AddToCartButton />
					</form>
				</div>
			</div>
		</div>
	);
};
