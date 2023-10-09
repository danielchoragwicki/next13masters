"use server";

import { CartRemoveItemDocument, CartSetProductQuantityDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const removeItem = (itemId: string) => {
	return executeGraphql({ query: CartRemoveItemDocument, variables: { itemId } });
};

export const changeItemQuantity = (itemId: string, quantity: number) => {
	return executeGraphql({ query: CartSetProductQuantityDocument, variables: { itemId, quantity } });
};
