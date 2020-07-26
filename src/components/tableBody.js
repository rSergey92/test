const EVENT = {
    SORT_CELL: 'sorting',
    FILTER_FIELD: 'filter',
}

export default class TableBody {
    constructor(table) {
        this.table = table;
        this.render();
    }

    createTableBody() {
        const tbody = document.createElement('tbody');
        let trow = '';
        let td = '';
        let count = 1;
        const textBody = ['id', 'firstName', 'lastName', 'email', 'phone']

        for(var i = 0; i < textBody.length; i++) {
           trow = this.createRow('tr');
           trow.classList.add('content-table__tr');
           tbody.appendChild(trow);

            for(var j = 0; j < textBody.length; j++) {
                td = this.createCell('td');
                td.setAttribute('data-field-body', textBody[j]);
                td.innerHTML = count;
                count++;
                trow.appendChild(td);
            }
        }

        return tbody;
    }

    createRow(tr) {
        return document.createElement(tr);
    }

    createCell(td) {
        return document.createElement(td);
    }

    startSort() {
        window.EventBus.fire(EVENT.SORT_CELL, this.sorting);
    }

    sorting({ field }) {
        const cell = [...document.querySelectorAll(`[data-field-body=${field}]`)];
        const sortCell = cell.map(item => item.innerHTML);
        const a = sortCell.sort(function(a,b) {
            return b - a;
        })
        console.log(a);
    }

    filter() {
        window.EventBus.fire(EVENT.FILTER_FIELD, this.filtered);
    }

    filtered({ target }) {
        console.log(target.value)
    }

    render() {
        this.table.appendChild(this.createTableBody());
    }
}