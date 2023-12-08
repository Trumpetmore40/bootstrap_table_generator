class Table {
  _data;

  _generateMarkup(data) {
    return `
     ${this._createClassList(data)}${this._tableCreator(data.rows, data.cols)}
     </table>
    `;
  }

  _createClassList(data) {
    return `<table class="table table-${data.color}${
      data.strippedRows ? ' table-striped' : ''
    }${data.strippedCols ? ' table-striped-columns' : ''}${
      data.hoverableRows ? ' table-hover' : ''
    }${data.bordered ? ' table-bordered' : ''}${
      data.nonBordered ? ' table-borderless' : ''
    }${data.smallTable ? ' table-sm' : ''}">`;
  }
  _theadCreator(cols) {
    let markup = `
      <thead>
        <tr>
          <th scope="col"> #</th>`;
    for (let i = 1; i <= cols; i++) {
      markup += `
        <th scope="col">${i}</th>`;
    }
    markup += `
              </tr>
            </thead>`;
    return markup;
  }

  _tbodyCreator(rows, cols) {
    let markup = `
      <tbody>
          <tr>`;
    for (let i = 1; i <= rows; i++) {
      markup += `
      <th scope="row">${i}</th>
      `;
      for (let j = 1; j <= cols; j++)
        markup += `<td>-</td>
      `;
      markup += `</tr>`;
    }
    markup += `</tbody>`;
    return markup;
  }

  _tableCreator(rows, cols) {
    return this._theadCreator(cols) + this._tbodyCreator(rows, cols);
  }
}

export default new Table();
