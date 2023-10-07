export type HeroProps = {
	title: string;
};

export const Hero = ({ title }: HeroProps) => {
	return (
		<div className="hero">
			<div className="hero-content py-16 text-center">
				<h1 className="text-3xl font-bold">{title}</h1>
			</div>
		</div>
	);
};
