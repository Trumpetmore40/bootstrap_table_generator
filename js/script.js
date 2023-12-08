import state from './model.js';
import table from './table.js';

const menu = document.querySelector('.menu');
const colors = document.querySelectorAll('.table-colors-color ');
const tablePreview = document.querySelector('.table-preview');
const htmlPreview = document.querySelector('.table-html');
const copyBtn = document.querySelector('.btn-copy');

const updateNumber = function (element, action) {
  let currentValue = +element.innerText;
  action === 'add-circle-outline' ? currentValue++ : currentValue--;
  if (currentValue < 1) currentValue = 1;
  element.innerText = currentValue;
};

const clear = data => {
  tablePreview.innerHTML = '';
  htmlPreview.innerText = '';
  menu
    .querySelectorAll('.table-rows-cols-number')
    .forEach(el => (el.innerText = 1));
  colors.forEach(el => el.classList.remove('color-active'));
  document.querySelectorAll('input').forEach(el => (el.checked = false));
  data.rows = 1;
  data.cols = 1;
  data.color = 'light';
  data.strippedRows = false;
  data.strippedCols = false;
  data.hoverableRows = false;
  data.bordered = false;
  data.nonBordered = false;
  data.smallTable = false;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(table._generateMarkup(state));
  copyBtn.classList.add('copied');
  copyBtn.innerText = 'Copied!';
  setTimeout(() => {
    copyBtn.classList.remove('copied');
    copyBtn.innerText = 'Copy HTML';
  }, 1000);
};

const appListener = () => {
  menu.addEventListener('click', e => {
    if (e.target.classList.contains('menu-icon'))
      updateNumber(
        e.target.closest('.icon-wrapper').querySelector('span'),
        e.target.name
      );
    else if (e.target.classList.contains('table-colors-color')) {
      colors.forEach(el => el.classList.remove('color-active'));
      e.target.classList.add('color-active');
      state.color = e.target.dataset.color;
    } else if (e.target.innerText === 'Create table') {
      state.rows = +document.querySelector('.rows-number').innerText;
      state.cols = +document.querySelector('.cols-number').innerText;
      document.querySelector('#input-1').checked
        ? (state.strippedRows = true)
        : (state.strippedRows = false);
      document.querySelector('#input-2').checked
        ? (state.strippedCols = true)
        : (state.strippedCols = false);
      document.querySelector('#input-3').checked
        ? (state.hoverableRows = true)
        : (state.hoverableRows = false);
      document.querySelector('#input-4').checked
        ? (state.bordered = true)
        : (state.bordered = false);
      document.querySelector('#input-5').checked
        ? (state.nonBordered = true)
        : (state.nonBordered = false);
      document.querySelector('#input-6').checked
        ? (state.smallTable = true)
        : (state.smallTable = false);
      const markup = table._generateMarkup(state);
      tablePreview.innerHTML = '';
      tablePreview.insertAdjacentHTML('beforeend', markup);
      htmlPreview.innerText = markup;
    } else if (e.target.classList.contains('btn-clear')) {
      clear(state);
    } else return;
  });
};

const copyListener = () => {
  copyBtn.addEventListener('click', () => copyToClipboard());
};

appListener();
copyListener();
