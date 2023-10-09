import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChangeQuantity } from "./ChangeQuantity";
import { RemoveButton } from "./RemoveButton";
import { CartGetByIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { executeGraphql } from "@/utils/executeGraphql";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const { order: cart } = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});

	if (!cart) {
		redirect("/");
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item, index) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.product.id + index}>
								<td>{item.product.name}</td>
								<td>
									<ChangeQuantity itemId={item.id} quantity={item.quantity} />
								</td>
								<td>{formatMoney(item.product.price)}</td>
								<td>
									<RemoveButton productId={item.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
