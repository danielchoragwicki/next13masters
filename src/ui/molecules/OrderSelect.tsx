"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { type ProductOrderByInput } from "@/gql/graphql";

type PartialRecord<K extends string, T> = {
	[P in K]?: T;
};

const orderBySelect: PartialRecord<ProductOrderByInput, { text: string; testId?: string }> = {
	price_ASC: { text: "Price ASC", testId: "sort-by-price" },
	price_DESC: { text: "Price DESC", testId: "sort-by-price" },
	averageRating_ASC: { text: "Rating ASC", testId: "sort-by-rating" },
	averageRating_DESC: { text: "Rating DESC", testId: "sort-by-rating" },
};

export type OrderSelectProps = { route: string };

export const OrderSelect = ({ route }: OrderSelectProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const sortBy = searchParams.get("sortBy");

	return (
		<select
			className="select select-bordered mb-5 ml-auto block"
			onChange={(e) => {
				const value = e.currentTarget.value;

				// @ts-expect-error FIXME
				router.replace(value === "default" ? route : `${route}?sortBy=${e.currentTarget.value}`);
			}}
		>
			<option value={"default"} selected={!sortBy}>
				Default
			</option>
			{Object.entries(orderBySelect).map(([key, value]) => (
				<option key={key} value={key} selected={sortBy === key} data-testid={value.testId}>
					{value.text}
				</option>
			))}
		</select>
	);
};
