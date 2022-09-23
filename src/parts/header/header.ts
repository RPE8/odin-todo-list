import './header.css';
import { createElement } from '../../utils';

const container = createElement('div', [
	'header__container',
	'container'
]) as HTMLDivElement;

export const render = (): typeof container => {
	const html = `<header class="header">
		<span class="material-icons header__logo md-36">list_alt</span>
		<span class="header__text">Todo List</span>
	</header>`;

	container.innerHTML = html;
	return container;
};
