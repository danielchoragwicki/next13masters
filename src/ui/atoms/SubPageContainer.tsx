import { type ReactNode } from "react";

export type SubPageContainerProps = {
	children: ReactNode;
};

export const SubPageContainer = ({ children }: SubPageContainerProps) => {
	return <section className="container mx-auto px-4">{children}</section>;
};
