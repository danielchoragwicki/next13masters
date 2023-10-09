"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function AddToCartButton() {
	const status = useFormStatus();

	return (
		<button
			type="submit"
			disabled={status.pending}
			className="disabled: btn btn-neutral disabled:cursor-wait"
		>
			Add to cart
			{status.pending && <span className="loading loading-spinner"></span>}
		</button>
	);
}
