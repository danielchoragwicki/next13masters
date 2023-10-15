import { handleCreateReviewAction } from "@/api/review";
import { type ProductBaseFragment, type ReviewFragment } from "@/gql/graphql";

type ReviewFormProps = {
	reviews: ReviewFragment[];
	product: ProductBaseFragment;
};

export const ReviewForm = ({ reviews, product }: ReviewFormProps) => {
	return (
		<div className="grid grid-cols-2 gap-10 py-10">
			<form data-testid="add-review-form" className="grid gap-5" action={handleCreateReviewAction}>
				<input type="text" name="productId" value={product.id} hidden />
				<input
					type="text"
					name="averageRating"
					value={reviews.reduce((acc, currValue) => acc + currValue.rating, 0) / reviews.length}
					hidden
				/>

				<h2 className="text-lg font-medium text-gray-900">Napisz recenzję</h2>
				<div>
					<label className="sr-only" htmlFor="headline">
						Tytuł
					</label>

					<input
						required
						className="input input-bordered w-full"
						placeholder="Tytuł"
						type="text"
						name="headline"
						id="headline"
					/>
				</div>
				<div>
					<label className="sr-only" htmlFor="email">
						Email
					</label>
					<input
						required
						className="input input-bordered w-full"
						placeholder="Adres email"
						type="email"
						name="email"
						id="email"
					/>
				</div>
				<div>
					<label className="sr-only" htmlFor="name">
						Name
					</label>
					<input
						required
						className="input input-bordered w-full"
						placeholder="Name"
						type="text"
						name="name"
						id="name"
					/>
				</div>
				<div>
					<label className="sr-only" htmlFor="rating">
						Ocena
					</label>
					<select
						required
						className="select select-bordered w-full"
						placeholder="Ocena"
						name="rating"
						id="rating"
					>
						<option value="1">1 star</option>
						<option value="2">2 stars</option>
						<option value="3">3 stars</option>
						<option value="4">4 stars</option>
						<option value="5">5 stars</option>
					</select>
				</div>
				<div>
					<label className="sr-only" htmlFor="message">
						Message
					</label>

					<textarea
						required
						className="textarea textarea-bordered w-full"
						placeholder="Treść"
						rows={8}
						name="content"
						id="content"
					></textarea>
				</div>
				<div>
					<button className="btn btn-secondary w-full" type="submit">
						Dodaj recenzję
					</button>
				</div>
			</form>
			<ul className="grid h-[600px] gap-5 overflow-auto">
				<li>Średnia ocen: {product.averageRating}</li>
				{reviews?.map((review) => (
					<li key={review.id} className="card bg-primary text-primary-content">
						<div className="card-body">
							<h2 className="card-title">
								{review.headline} - <b>{review.rating}</b>
							</h2>
							<p>{review.content}</p>
							<p>~ {review.name}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
