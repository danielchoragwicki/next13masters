import { authMiddleware } from "@clerk/nextjs";

// eslint-disable-next-line import/no-default-export
export default authMiddleware({
	publicRoutes: [
		"/",
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
		"/products",
	],
	ignoredRoutes: ["/api/webhook/stripe"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
