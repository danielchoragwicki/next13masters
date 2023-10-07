import { CollectionItem } from "@/ui/molecules/CollectionItem";
import { type CollectionFragment } from "@/gql/graphql";

type CollectionListProps = {
	collections: CollectionFragment[];
};

export const CollectionList = ({ collections }: CollectionListProps) => {
	return (
		<div className="grid grid-cols-3 gap-8 py-16">
			{collections.map((collection) => (
				<CollectionItem key={collection.id} collection={collection} />
			))}
		</div>
	);
};
