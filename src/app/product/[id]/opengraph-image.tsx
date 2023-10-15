import { ImageResponse } from "next/server";
import { type ProductPageParams } from "./page";
import { ProductPageByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function og({ params: { id } }: { params: ProductPageParams }) {
	if (!id) return null;

	const data = await executeGraphql({ query: ProductPageByIdDocument, variables: { id } });

	return new ImageResponse(
		(
			<div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-2xl"
				style={{
					background: `
				    linear-gradient(
				      90deg,
				      rgb(6,172,214) 0%,
				      rgb(0,0,0) 20%,
				      rgb(0,0,0) 80%,
				      rgb(6,71,255) 100%
				    )`,
					backgroundImage: `url(${data.product?.images[0]?.url})`,
				}}
			>
				<p tw="font-sans uppercase text-[101px] leading-4">{data.product?.name}</p>
				<p tw="font-serif font-black">{data.product?.description}</p>
				<p tw="m-0 mt-2">{data.product?.categories.map((category) => category.name).join(", ")}</p>
			</div>
		),
	);
}
