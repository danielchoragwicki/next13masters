import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { executeGraphql } from "@/utils/executeGraphql";
import { ProductPageByIdDocument, ProductPageRelatedDocument } from "@/gql/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { SubPageContainer } from "@/ui/atoms/SubPageContainer";
import { ProductDetails } from "@/ui/organisms/ProductDetails";

export type ProductPageParams = { id?: string };
type ProductPageProps = { params: ProductPageParams };

export async function generateMetadata({
	params: { id },
}: {
	params: ProductPageParams;
}): Promise<Metadata> {
	const data = await executeGraphql({
		query: ProductPageByIdDocument,
		variables: { id: id || "" },
	});

	return { title: data.product?.name, description: data.product?.description };
}

export default async function Product({ params: { id } }: ProductPageProps) {
	let data;
	let relatedProducts;

	try {
		if (!id) throw new Error("No id");

		data = await executeGraphql({ query: ProductPageByIdDocument, variables: { id } });
		relatedProducts = await executeGraphql({
			query: ProductPageRelatedDocument,
			variables: {
				categoryId: data.product?.categories[0]?.id ?? "",
				productId: id,
			},
		});

		if (!data.product) throw new Error("No product");
	} catch {
		notFound();
	}

	return (
		<SubPageContainer>
			<ProductDetails product={data.product} />
			<RelatedProducts products={relatedProducts.products.slice(0, 4) || []} />
		</SubPageContainer>
	);
}
