import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProduct } from "@/utils/getProduct";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	let product;

	try {
		product = await getProduct(params.productId);
	} catch {}

	return { title: product?.name, description: product?.description };
}

export async function generateStaticParams({
	params: { productId },
}: {
	params: { productId: string };
}) {
	return [{ productId }];
}

export default async function Product({ params }: { params: { productId: string } }) {
	let product;

	try {
		product = await getProduct(params.productId);
	} catch {
		notFound();
	}

	return (
		<section className="mx-auto h-screen max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<h1>{product.name}</h1>
			<p>{product.description}</p>
		</section>
	);
}
