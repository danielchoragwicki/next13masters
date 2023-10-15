import { ActiveLink, type ActiveLinkProps } from "../atoms/ActiveLink";

export type PaginationProps<T extends string> = {
	setHref: (page: number) => ActiveLinkProps<T>["href"];
	pageSize: number;
	totalCount: number;
};

export const Pagination = <T extends string>({
	pageSize,
	setHref,
	totalCount,
}: PaginationProps<T>) => {
	const pages = Array.from({ length: Math.ceil(totalCount / pageSize) }, (_, i) => i + 1);

	if (pages.length < 2) return null;
	return (
		<nav className="mt-16 flex justify-center">
			<ul className="join" aria-label="pagination">
				{pages.map((page) => (
					<li key={page}>
						<ActiveLink className="btn join-item" activeClassName="btn-active" href={setHref(page)}>
							{page}
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
