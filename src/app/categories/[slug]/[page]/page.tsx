import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { CategoryPageBySlugDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";
import { paginationHelper } from "@/utils";
import { CATEGORIES, PAGE_LIMIT } from "@/constants";

type CategoryPageParams = { slug?: string; page?: string };
type CategoryPageProps = { params: CategoryPageParams };

export async function generateMetadata({
	params: { slug },
}: {
	params: CategoryPageParams;
}): Promise<Metadata> {
	const data = await executeGraphql(CategoryPageBySlugDocument, {
		slug: slug || "",
		first: 0,
		skip: 0,
	});

	return { title: data.categories[0]?.name, description: data.categories[0]?.description };
}

export async function generateStaticParams() {
	const params = await CATEGORIES.reduce(
		async (acc, category) => {
			const data = await executeGraphql(CategoryPageBySlugDocument, {
				slug: category.slug,
				first: 0,
				skip: 0,
			});
			const prevCategories = await acc;
			const pageCount = Math.ceil(data.productsConnection.aggregate.count / PAGE_LIMIT);

			const categories = Array.from({ length: pageCount }, (_, index) => ({
				slug: category.slug,
				page: (index + 1).toString(),
			})) as unknown as CategoryPageParams[];

			return [...prevCategories, ...categories];
		},
		Promise.resolve([] as CategoryPageParams[]),
	);

	return params;
}

export default async function CategoryPage({ params: { page, slug } }: CategoryPageProps) {
	let data;

	try {
		if (!slug) throw new Error("No slug");

		data = await executeGraphql(CategoryPageBySlugDocument, { slug, ...paginationHelper(page) });

		if (!data.categories.length) throw new Error("No category");
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
