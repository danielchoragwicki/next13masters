"use client";

import { type Route } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

export type ActiveLinkProps<T extends string> = {
	activeClassName: string;
	children: React.ReactNode;
	className: string;
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

	return (
		<Link className={clsx(className, active && activeClassName)} href={href}>
			{children}
		</Link>
	);
};
