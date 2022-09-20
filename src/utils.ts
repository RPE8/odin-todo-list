import { add } from 'date-fns';

type TIconSize = 'md-18' | 'md-24' | 'md-36' | 'md-48';
type TIconCreator = (
  name: string,
  size: TIconSize,
  additionalClasses?: string[] | string
) => HTMLSpanElement;
type TElementCreator = (
  el: string,
  classes?: string[] | string,
  att?: [string, string][] | [string, string]
) => HTMLElement;
type TObjectClone = <T>(object: T) => T;

export const createIcon: TIconCreator = (name, size, additionalClasses) => {
  let classes = ['material-icons'];

  if (size) {
    classes.push(size);
  }
  if (Array.isArray(additionalClasses)) {
    classes = classes.concat(additionalClasses);
  } else if (typeof additionalClasses === 'string') {
    classes.push(additionalClasses);
  }

  const span = createElement('span', classes);
  span.textContent = name;
  return span;
};

export const createElement: TElementCreator = (el, classes, att) => {
  const element = document.createElement(el);
  if (Array.isArray(classes)) {
    element.classList.add(...classes);
  } else if (typeof classes === 'string') {
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
};

export const copyObj: TObjectClone = (object) => {
  return JSON.parse(JSON.stringify(object));
};
