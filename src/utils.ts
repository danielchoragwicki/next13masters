import { PAGE_LIMIT } from "./constants";

export const formatMoney = (amount: number) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount / 100);

export const paginationHelper = (
	page: string = "1",
	limit: number = PAGE_LIMIT,
): { first: number; skip: number } => {
	const pageNumber = parseInt(page);

	return { first: limit, skip: (pageNumber - 1) * limit };
};
