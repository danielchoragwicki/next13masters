import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { CollectionPageBySlugDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";
import { SubPageContainer } from "@/ui/atoms/SubPageContainer";
import { Hero } from "@/ui/atoms/Hero";
import { ProductList } from "@/ui/organisms/ProductList";
import { Pagination } from "@/ui/organisms/Pagination";
import { PAGE_LIMIT } from "@/constants";

type CollectionPageParams = { slug?: string };
type CollectionPageProps = { params: CollectionPageParams };

export async function generateMetadata({
	params: { slug },
}: {
	params: CollectionPageParams;
}): Promise<Metadata> {
	const data = await executeGraphql({
		query: CollectionPageBySlugDocument,
		variables: {
			slug: slug || "",
			first: 0,
			skip: 0,
		},
	});

	return { title: data.collections[0]?.name, description: data.collections[0]?.description };
}

// TODO: uncomment before release
// export async function generateStaticParams() {
// 	const data = await executeGraphql({ query: CollectionPageCollectionsDocument });

// 	return data.collections.map((collection) => ({ slug: collection.slug }));
// }

export default async function CollectionPage({ params: { slug } }: CollectionPageProps) {
	let data;

	try {
		data = await executeGraphql({
			query: CollectionPageBySlugDocument,
			variables: {
				slug: slug || "",
				first: 10,
				skip: 0,
			},
		});

		if (!data.products.pageInfo.pageSize) throw new Error("No products");
	} catch {
		notFound();
	}

	return (
		<SubPageContainer>
			<Hero title={data.collections[0]?.name ?? ""} />
			<ProductList products={data.products.edges.map((edge) => edge.node)} />
			<Pagination
				pageSize={PAGE_LIMIT}
				setHref={(page) => `/categories/${slug}/${page}`}
				totalCount={data.products.aggregate.count}
			/>
		</SubPageContainer>
	);
}
