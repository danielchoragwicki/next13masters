"use server";
import { CreateReviewDocument, PublishReviewDocument } from "@/gql/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const handleCreateReviewAction = async (formData: FormData) => {
	const averageRating = formData.get("averageRating") as unknown as string;
	const content = formData.get("content") as unknown as string;
	const email = formData.get("email") as unknown as string;
	const headline = formData.get("headline") as unknown as string;
	const name = formData.get("name") as unknown as string;
	const productId = formData.get("productId") as unknown as string;
	const rating = formData.get("rating") as unknown as string;

	const data = await executeGraphql({
		query: CreateReviewDocument,
		variables: {
			averageRating: parseInt(averageRating),
			data: {
				content,
				email,
				headline,
				name,
				rating: parseInt(rating),
				product: { connect: { id: productId } },
			},
			productId,
		},
	});

	if (data.createReview?.id)
		await executeGraphql({
			query: PublishReviewDocument,
			variables: {
				reviewId: data.createReview.id,
			},
		});
};
