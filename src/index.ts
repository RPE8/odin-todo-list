import "./index.css";
import {render as renderHeader} from "./parts/header/header";
import {render as renderMain} from "./parts/main/main";
import {render as renderAside} from "./parts/aside/aside";
import {createElement} from "./utils";

import {format} from 'date-fns';

const body = document.querySelector("body");

function render(): void {
	if (!body) throw new Error("err");

	const content = createElement("div", "content");
	content.append(renderHeader(), renderMain(), renderAside());
	body.append(content);
}

render();