import { OrderSelect, type OrderSelectProps } from "../molecules/OrderSelect";
import { type ProductBaseFragment } from "@/gql/graphql";
import { ProductItem } from "@/ui/molecules/ProductItem";

type ProductListProps = {
	products: ProductBaseFragment[];
	orderSelect?: OrderSelectProps;
	testId?: string;
};

export const ProductList = ({
	products,
	orderSelect,
	testId = "products-list",
}: ProductListProps) => {
	return (
		<>
			{orderSelect && <OrderSelect {...orderSelect} />}
			<ul className="grid grid-cols-4 gap-8" data-testid={testId}>
				{products.map((product) => (
					<li key={product.id}>
						<ProductItem product={product} />
					</li>
				))}
			</ul>
		</>
	);
};
