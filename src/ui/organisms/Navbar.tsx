import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import { CATEGORIES } from "@/constants";

const items: {
	title: string;
	exact?: boolean;
	href: Route;
}[] = [
	{ title: "Home", href: "/", exact: true },
	{ title: "All", href: "/products" },
	// @ts-expect-error abc
	...CATEGORIES.map((category) => ({
		title: category.name,
		href: `/categories/${category.slug}`,
	})),
];

export const Navbar = () => {
	return (
		<nav>
			<ul>
				{items.map((item) => (
					<li key={item.title}>
						<ActiveLink
							href={item.href}
							className=""
							activeClassName="border-b-2 border-blue-950"
							exact={item.exact}
						>
							{item.title}
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
