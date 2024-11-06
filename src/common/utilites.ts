export const generateDomElement = <T extends HTMLElement>(
  tag: string,
  innerHTML?: string | null,
  parent?: HTMLElement | null,
  ...classes: string[]
): T => {
  const element = <T>document.createElement(tag);
  const arrClasses: string[] = [];
  let elementId = '';

  const fillArray = (selector: string): void => {
    const [, separ, name] = selector.split(/([.#])/);
    if (separ === '.') arrClasses.push(name);
    else if (separ === '#') elementId = name;
  };

  classes.forEach((className) => {
    if (Array.isArray(className)) {
      className.forEach((classInside) => fillArray(classInside));
    } else if (className) className.split(' ').forEach((splittedClass) => fillArray(splittedClass));
  });
  if (arrClasses.length) element.classList.add(...arrClasses);
  if (elementId) element.id = elementId;
  if (innerHTML) element.innerHTML = innerHTML;
  if (parent) parent.append(element);
  return element;
};

export const cleanClass = (className: string): string => className.split('.')[1];
export const delay = (ms = 1000): Promise<void> =>
  new Promise((res) => {
    setTimeout(res, ms);
  });
