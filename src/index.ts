import "./index.css";
import {render as renderHeader} from "./parts/header/header";
import {render as renderMain} from "./parts/main/main";
import {renderToolbar, renderProjects} from "./parts/aside/aside";
import {addProject, getProjects} from "./modules/project";
import {createElement} from "./utils";

import {format} from 'date-fns';

const body = document.querySelector("body");

function render(): void {
	if (!body) throw new Error("err");

	const content = createElement("div", "content");
	content.append(renderHeader(), renderMain(), renderToolbar([]));
	body.append(content);
}

render();

let formAddBtn = document.querySelector(".add-form__add");
let formCancelBtn = document.querySelector(".add-form__cancel");
let formAddTitle = document.querySelector(".add-form__title") as HTMLInputElement;
// const addProject = (project) => {

// }


formAddBtn?.addEventListener("click", () => {
	const title = formAddTitle.value;
	addProject({
		id: title,
		title: title,
		description: "",
		tasks: []
	});
	renderProjects(getProjects());
})



console.log(getProjects());