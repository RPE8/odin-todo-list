import "./index.css";
import {format} from 'date-fns';

const body = document.querySelector("body");

function createContentContainer(parent: HTMLBodyElement): HTMLDivElement {
	const content = document.createElement("div");
	content.setAttribute("id", "content");

	parent.append(content);
	return content;
}

if (!body) {
	console.error("There is no parent");
	throw new Error("There is no parent");
}

const content = createContentContainer(body);
