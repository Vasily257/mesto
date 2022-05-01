export default class Sections {
  constructor({ items, render }, containerSelector) {
    this._items = items;
    this._renderer = render;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
