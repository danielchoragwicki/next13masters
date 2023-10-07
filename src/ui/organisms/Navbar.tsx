import { type Route } from "next";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { SearchInput } from "@/ui/molecules/SearchInput";
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
		<header className="navbar bg-base-100">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl normal-case">next13masters</a>
			</div>
			<nav className="navbar-center hidden lg:flex" role="navigation">
				<ul className="menu rounded-box bg-base-200 lg:menu-horizontal">
					{items.map((item) => (
						<li key={item.title}>
							<ActiveLink activeClassName="active" exact={item.exact} href={item.href}>
								{item.title}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>
			<div className="navbar-end">
				<SearchInput />
			</div>
		</header>
	);
};
