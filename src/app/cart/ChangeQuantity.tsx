"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

export function ChangeQuantity({ itemId, quantity }: { itemId: string; quantity: number }) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex">
			<button
				className="h-6 w-6 border"
				type="submit"
				data-testid="decrement"
				disabled={optimisticQuantity === 1}
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
				}}
			>
				-
			</button>
			<span className="w-8 text-center" data-testid="quantity">
				{optimisticQuantity}
			</span>
			<button
				className="h-6 w-6 border"
				type="submit"
				data-testid="increment"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
		</form>
	);
}
