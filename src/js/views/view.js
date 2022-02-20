import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  /**
   *
   * @param {*} data
   * @param {*} render
   * @returns
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const mockUps = this._generateMockups();

    if (!render) {
      return mockUps;
    }
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', mockUps);
  }
  update(data) {
    this._data = data;
    const newMockUps = this._generateMockups();

    const newDom = document.createRange().createContextualFragment(newMockUps);

    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      // Update The Change Text
      if (
        !curEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Update The Attributes
      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const mockups = `
    <div class="spinner">
      <svg>
          <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', mockups);
  }

  renderError(message = this._errorMessage) {
    const mockups = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
   `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', mockups);
  }
  renderMessage(message = this._message) {
    const mockups = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
   `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', mockups);
  }
}
