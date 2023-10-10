"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { type ChangeEventHandler, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const [value, setValue] = useState(query || "");
	const [debouncedValue] = useDebounce(value, 500);

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
		setValue(event.target.value);

	useEffect(() => {
		debouncedValue && router.replace(`/search?query=${debouncedValue}`);
	}, [debouncedValue, router]);

	return (
		<input
			className="input input-bordered"
			onChange={handleChange}
			placeholder="Search for..."
			type="text"
			value={value}
		/>
	);
};
