import "./index.css";
import {render as renderHeader} from "./header/header";
import {createElement} from "./utils";

import {format} from 'date-fns';

const body = document.querySelector("body");

function render(): void {
	if (!body) throw new Error("err");

	const content = createElement("div", "content");
	content.append(renderHeader())
	body.append(content);
}

render();