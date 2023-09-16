import { ActiveLink } from "../atoms/ActiveLink";

export type PaginationProps = {
	currentPage: number;
	pageSize: number;
	totalCount: number;
};

export const Pagination = ({ currentPage, pageSize, totalCount }: PaginationProps) => {
	const pages = Array.from({ length: totalCount / pageSize }, (_, i) => i + 1);

	return (
		<nav aria-label="Pagination">
			<ul className="list-style-none flex">
				<li>
					<a
						className="relative block rounded bg-slate-600 px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
						href={`/products/${currentPage - 1}`}
					>
						Previous
					</a>
				</li>
				{pages.map((page) => (
					<li key={page}>
						<ActiveLink
							className="relative block rounded bg-slate-600 px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
							activeClassName="bg-neutral-700"
							href={`/products/${page}`}
						>
							{page}
						</ActiveLink>
					</li>
				))}
				<li>
					<a
						className="relative block rounded bg-slate-600 px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
						href={`/products/${currentPage + 1}`}
					>
						Next
					</a>
				</li>
			</ul>
		</nav>
	);
};
