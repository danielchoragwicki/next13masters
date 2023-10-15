import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OrdersGetByEmailDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export default async function Orders() {
	const user = await currentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
		?.emailAddress;

	if (!email) {
		return <div>User does not have email</div>;
	}

	const { orders } = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: { email },
	});

	return (
		<div>
			<h1>{user.firstName}&rsquo;s Orders</h1>
			{orders.length === 0 ? (
				<div>No orders found</div>
			) : (
				<ul>
					{/* {orders.map(
						(order) =>
							order.id &&
							order.attributes?.createdAt && (
								<li key={order.id}>
									<div>{order.attributes.orderId}</div>
									<div>
										<time dateTime={order.attributes.createdAt}>{order.attributes.createdAt}</time>
									</div>
								</li>
							),
					)} */}
				</ul>
			)}
		</div>
	);
}
