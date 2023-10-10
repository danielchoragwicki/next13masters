import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { ChangeQuantity } from "./ChangeQuantity";
import { RemoveButton } from "./RemoveButton";
import { CartGetByIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { executeGraphql } from "@/utils/executeGraphql";
import { handleStripePaymentAction } from "@/api/cart";

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
			<form action={handleStripePaymentAction} className="ml-auto">
				<button
					type="submit"
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
