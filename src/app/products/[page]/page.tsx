import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { executeGraphql } from "@/utils/executeGraphql";
import { ProductsPageDocument } from "@/gql/graphql";
import { SubPageContainer } from "@/ui/atoms/SubPageContainer";
import { Hero } from "@/ui/atoms/Hero";
import { PAGE_LIMIT } from "@/constants";
import { paginationHelper } from "@/utils";

type ProductsPageParams = { page?: string };
type ProductsPageProps = { params: ProductsPageParams };

export async function generateMetadata({
	params: { page },
}: {
	params: ProductsPageParams;
}): Promise<Metadata> {
	return {
		title: `Products list: page ${page}`,
		description: "Store built for the demo purpose of next13masters.pl",
	};
}

export async function generateStaticParams() {
	const data = await executeGraphql(ProductsPageDocument, {
		first: 0,
		skip: 0,
	});

	const pageCount = Math.ceil(data.products.aggregate.count / PAGE_LIMIT);

	return Array.from({ length: pageCount }, (_, index) => ({
		page: (index + 1).toString(),
	})) as unknown as ProductsPageParams[];
}

export default async function ProductsPage({ params: { page } }: ProductsPageProps) {
	let data;

	try {
		data = await executeGraphql(ProductsPageDocument, { ...paginationHelper(page) });

		if (!data.products.pageInfo.pageSize) throw new Error("No products");
	} catch {
		notFound();
	}

	return (
		<SubPageContainer>
			<Hero title={"All products"} />
			<ProductList products={data.products.edges.map((edge) => edge.node)} />
			<Pagination
				pageSize={PAGE_LIMIT}
				setHref={(page) => `/products/${page}`}
				totalCount={data.products.aggregate.count}
			/>
		</SubPageContainer>
	);
}
