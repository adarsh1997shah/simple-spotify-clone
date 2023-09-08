export function getBackgroundColor(color) {
	const [red, green, blue] = color;

	return `linear-gradient(135deg, rgba(${red},${green},${blue}, 0.5) 0%, rgba(${red},${green},${blue}, 1) 100%)`;
}
