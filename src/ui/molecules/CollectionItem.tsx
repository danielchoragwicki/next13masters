import Image from "next/image";
import Link from "next/link";
import { type CollectionFragment } from "@/gql/graphql";

type CollectionItemProps = {
	collection: CollectionFragment;
};

export const CollectionItem = ({ collection }: CollectionItemProps) => {
	return (
		<Link
			className="card bg-base-100 image-full shadow-xl transition-all hover:scale-105"
			href={`/collections/${collection.slug}`}
		>
			<figure>
				<Image
					alt={collection.name}
					height={collection.image.height ?? 0}
					src={collection.image.url ?? ""}
					width={collection.image.width ?? 0}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{collection.name}</h2>
			</div>
		</Link>
	);
};
