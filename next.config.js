/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: { typedRoutes: true, serverActions: true },
	env: {
		GRAPHQL_URL: process.env.GRAPHQL_URL,
		HYGRAPH_MUTATION_TOKEN: process.env.HYGRAPH_MUTATION_TOKEN,
	},
	redirects: async () => [
		{
			source: "/products",
			destination: "/products/1",
			permanent: false,
		},
		{
			source: `/categories/t-shirts`,
			destination: `/categories/t-shirts/1`,
			permanent: false,
		},
		{
			source: `/categories/hoodies`,
			destination: `/categories/hoodies/1`,
			permanent: false,
		},
		{
			source: `/categories/accessories`,
			destination: `/categories/accessories/1`,
			permanent: false,
		},
	],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.graphassets.com",
			},
		],
	},
};

module.exports = nextConfig;
