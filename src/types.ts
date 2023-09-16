export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	price: number;
	coverImage: {
		src: string;
		alt: string;
	};
};

export type ProductResponse = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export type Product = {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
	description: string;
	rating: {
		rate: number;
		count: number;
	};
	longDescription: string;
};
