export const debounce = <T extends Function>(action: T, delay: number) => {
	let timer: NodeJS.Timeout;

	console.log("action", action);

	return (...args: unknown[]) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			action(...args);
		}, delay);
	};
};
