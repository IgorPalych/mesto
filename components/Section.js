export default class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._container = container;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
