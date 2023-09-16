import { notFound } from "next/navigation";
import { Pagination } from "@/ui/organisms/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList } from "@/utils/getProductsList";

export async function generateStaticParams({ params: {} }: { params: { productsPage: string } }) {
	return [{ productsPage: "1" }, { productsPage: "2" }, { productsPage: "3" }];
}

export default async function ProductsPage({ params }: { params: { productsPage: string } }) {
	const page = parseInt(params.productsPage);

	if (!(page > 0 && page <= 3)) return notFound();

	const products = await getProductsList(page * 20);

	return (
		<section className="mx-auto h-screen max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<ProductList products={products} />
			<Pagination currentPage={page} pageSize={20} totalCount={60} />
		</section>
	);
}
