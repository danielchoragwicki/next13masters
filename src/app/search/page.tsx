import { notFound } from "next/navigation";
import { executeGraphql } from "@/utils/executeGraphql";
import { SearchPageProductsDocument } from "@/gql/graphql";
import { paginationHelper } from "@/utils";
import { SubPageContainer } from "@/ui/atoms/SubPageContainer";
import { Hero } from "@/ui/atoms/Hero";
import { ProductList } from "@/ui/organisms/ProductList";

type SearchPageSearchParams = { query: string };
type SearchPageProps = { searchParams: SearchPageSearchParams };

export default async function SearchPage({ searchParams: { query } }: SearchPageProps) {
	let data;

	try {
		data = await executeGraphql({
			query: SearchPageProductsDocument,
			variables: {
				search: query || "",
				...paginationHelper("1", 100),
			},
		});
	} catch {
		notFound();
	}

	return (
		<SubPageContainer>
			<Hero title={`Found ${data.products.aggregate.count} items for phrase "${query}"`} />
			<ProductList products={data.products.edges.map((edge) => edge.node)} />
			{/* TODO: add pagination */}
			{/* <Pagination
				pageSize={PAGE_LIMIT}
				setHref={(page) => `/categories/${slug}/${page}`}
				totalCount={data.products.aggregate.count}
			/> */}
		</SubPageContainer>
	);
}
