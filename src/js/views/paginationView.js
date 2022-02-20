import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _nextPaginationBtn(curPage) {
    const btnNext = `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
    return btnNext;
  }
  _prevPaginationBtn(curPage) {
    const btnPrev = `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
    return btnPrev;
  }
  _generateMockups() {
    const curPage = this._data.page;
    // Total pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // On page 1 and there are also other pages
    if (curPage === 1 && numPages > 1) {
      return this._nextPaginationBtn(curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._prevPaginationBtn(curPage);
    }
    // Another Page
    if (curPage < numPages) {
      return `
          ${this._prevPaginationBtn(curPage)}
          ${this._nextPaginationBtn(curPage)}
      `;
    }

    // On page 1 and there are no other pages
    return '';
  }
}
export default new PaginationView();
