import { RootPageDocument } from "@/gql/graphql";
import { SubPageContainer } from "@/ui/atoms/SubPageContainer";
import { CollectionList } from "@/ui/organisms/CollectionList";
import { ProductList } from "@/ui/organisms/ProductList";
import { executeGraphql } from "@/utils/executeGraphql";

export default async function Home() {
	const data = await executeGraphql({ query: RootPageDocument, variables: { first: 4, skip: 0 } });

	return (
		<SubPageContainer>
			<CollectionList collections={data.collections} />
			<ProductList products={data.products.edges.map((edge) => edge.node)} />
		</SubPageContainer>
	);
}
