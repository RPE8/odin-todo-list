type TIconSize = "md-18" | "md-24" | "md-36" | "md-48";
type TIconCreator = (name: string, size: TIconSize) => HTMLSpanElement;
type TElementCreator = (el: string, classes?: string[] | string, att?: [string, string][] | [string, string]) => HTMLElement;

export const createIcon: TIconCreator = (name, size) => {
	const classes = size ? ["material-icons", size] : "material-icons";
	const span = createElement("span", classes);
	span.textContent = name;
	return span;
}

export const createElement: TElementCreator = (el, classes, att) => {
	const element = document.createElement(el);
	if (Array.isArray(classes)) {
		element.classList.add(...classes);
	} else if (typeof classes === "string") {
		element.classList.add(classes);
	}

	if (Array.isArray(att)) {
		if (Array.isArray(att[0])) {
			att.forEach((att) => {
				element.setAttribute(att[0], att[1]);
			});
		} else {
			// workaround for type error
			element.setAttribute(att[0], att[1] as string);
		}
		
	}

	return element;
}