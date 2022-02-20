import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet. Find a nice recipe and bookmark it :)';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMockups() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarkView();
