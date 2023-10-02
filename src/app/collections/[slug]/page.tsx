import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { CollectionPageBySlugDocument, CollectionPageCollectionsDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

type CollectionPageParams = { slug?: string };
type CollectionPageProps = { params: CollectionPageParams };

export async function generateMetadata({
	params: { slug },
}: {
	params: CollectionPageParams;
}): Promise<Metadata> {
	const data = await executeGraphql(CollectionPageBySlugDocument, {
		slug: slug || "",
		first: 0,
		skip: 0,
	});

	return { title: data.collections[0]?.name, description: data.collections[0]?.description };
}

export async function generateStaticParams() {
	const data = await executeGraphql(CollectionPageCollectionsDocument);

	return data.collections.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionPage({ params: { slug } }: CollectionPageProps) {
	let data;

	try {
		data = await executeGraphql(CollectionPageBySlugDocument, {
			slug: slug || "",
			first: 10,
			skip: 0,
		});

		if (!data.productsConnection.pageInfo.pageSize) throw new Error("No products");
	} catch {
		notFound();
	}

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
