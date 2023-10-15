"use client";

import { type Route } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname, useSearchParams } from "next/navigation";

export type ActiveLinkProps<T extends string> = {
	activeClassName: string;
	children: React.ReactNode;
	className?: string;
	exact?: boolean;
	href: Route<T>;
};

export const ActiveLink = <T extends string>({
	href,
	children,
	className,
	activeClassName,
	exact,
}: ActiveLinkProps<T>) => {
	const pathname = usePathname();
	const active = exact ? href === pathname : pathname.startsWith(href);
	const searchParams = useSearchParams();

	return (
		<Link
			className={clsx(className, active && activeClassName)}
			// @ts-expect-error FIXME
			href={{ pathname: href, search: searchParams }}
			role="link"
			aria-current={active ? "page" : undefined}
		>
			{children}
		</Link>
	);
};
