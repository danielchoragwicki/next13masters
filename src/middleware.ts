import { authMiddleware } from "@clerk/nextjs";

// eslint-disable-next-line import/no-default-export
export default authMiddleware({
	publicRoutes: [
		"/",
		// @ts-expect-error FIXME
		"/products/(.*)",
		"/products",
		"/search",
		"/cart",
		// @ts-expect-error FIXME
		"/categories",
		// @ts-expect-error FIXME
		"/categories/(.*)",
		// @ts-expect-error FIXME
		"/collections",
		// @ts-expect-error FIXME
		"/collections/(.*)",
		// @ts-expect-error FIXME
		"/product",
		// @ts-expect-error FIXME
		"/product/(.*)",
	],
	ignoredRoutes: ["/opengraph-image", "/api/webhook", "/api/webhook/stripe"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
