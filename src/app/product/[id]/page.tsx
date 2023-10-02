import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { executeGraphql } from "@/utils/executeGraphql";
import { ProductPageByIdDocument, ProductPageRelatedDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";

type ProductPageParams = { id?: string };
type ProductPageProps = { params: ProductPageParams };

export async function generateMetadata({
	params: { id },
}: {
	params: ProductPageParams;
}): Promise<Metadata> {
	const data = await executeGraphql(ProductPageByIdDocument, { id: id || "" });

	return { title: data.product?.name, description: data.product?.description };
}

export default async function Product({ params: { id } }: ProductPageProps) {
	let data;
	let relatedProducts;

	try {
		if (!id) throw new Error("No id");

		data = await executeGraphql(ProductPageByIdDocument, { id });
		relatedProducts = await executeGraphql(ProductPageRelatedDocument, {
			categoryId: data.product?.categories[0]?.id ?? "",
		});

		if (!data.product) throw new Error("No product");
	} catch {
		notFound();
	}

	return (
		<section>
			<code>{JSON.stringify(data, null, 2)}</code>
			<RelatedProducts products={relatedProducts.products.slice(0, 4) || []} />
		</section>
	);
}
