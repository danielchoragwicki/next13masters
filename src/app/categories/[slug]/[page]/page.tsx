import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { CategoryPageBySlugDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";
import { paginationHelper } from "@/utils";
import { PAGE_LIMIT } from "@/constants";
import { ProductList } from "@/ui/organisms/ProductList";
import { Hero } from "@/ui/atoms/Hero";
import { SubPageContainer } from "@/ui/atoms/SubPageContainer";
import { Pagination } from "@/ui/organisms/Pagination";

type CategoryPageParams = { slug?: string; page?: string };
type CategoryPageProps = { params: CategoryPageParams };

export async function generateMetadata({
	params: { slug },
}: {
	params: CategoryPageParams;
}): Promise<Metadata> {
	const data = await executeGraphql({
		query: CategoryPageBySlugDocument,
		variables: {
			slug: slug || "",
			first: 0,
			skip: 0,
		},
	});

	return { title: data.categories[0]?.name, description: data.categories[0]?.description };
}

// TODO: uncomment before release
// export async function generateStaticParams() {
// 	const params = await CATEGORIES.reduce(
// 		async (acc, category) => {
// 			const data = await executeGraphql({
// 				query: CategoryPageBySlugDocument,
// 				variables: {
// 					slug: category.slug,
// 					first: 0,
// 					skip: 0,
// 				},
// 			});
// 			const prevCategories = await acc;
// 			const pageCount = Math.ceil(data.products.aggregate.count / PAGE_LIMIT);

// 			const categories = Array.from({ length: pageCount }, (_, index) => ({
// 				slug: category.slug,
// 				page: (index + 1).toString(),
// 			})) as unknown as CategoryPageParams[];

// 			return [...prevCategories, ...categories];
// 		},
// 		Promise.resolve([] as CategoryPageParams[]),
// 	);

// 	return params;
// }

export default async function CategoryPage({ params: { page, slug } }: CategoryPageProps) {
	let data;

	try {
		if (!slug) throw new Error("No slug");

		data = await executeGraphql({
			query: CategoryPageBySlugDocument,
			variables: { slug, ...paginationHelper(page) },
		});

		if (!data.categories.length) throw new Error("No category");
		if (!data.products.pageInfo.pageSize) throw new Error("No products");
	} catch {
		notFound();
	}

	return (
		<SubPageContainer>
			<Hero title={data.categories[0]?.name ?? ""} />
			<ProductList products={data.products.edges.map((edge) => edge.node)} />
			<Pagination
				pageSize={PAGE_LIMIT}
				setHref={(page) => `/categories/${slug}/${page}`}
				totalCount={data.products.aggregate.count}
			/>
		</SubPageContainer>
	);
}
