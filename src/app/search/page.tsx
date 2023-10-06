import { notFound } from "next/navigation";
import { executeGraphql } from "@/utils/executeGraphql";
import { SearchPageProductsDocument } from "@/gql/graphql";
import { paginationHelper } from "@/utils";

type SearchPageSearchParams = { query: string };
type SearchPageProps = { searchParams: SearchPageSearchParams };

export default async function SearchPage({ searchParams: { query } }: SearchPageProps) {
	let data;

	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		data = await executeGraphql(SearchPageProductsDocument, {
			search: query || "",
			...paginationHelper("1"),
		});
	} catch {
		notFound();
	}

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
