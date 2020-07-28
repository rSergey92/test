import Pagination from "./pagination";
import Filter from './filter'
import SelectedContact from './selectedContact.js';

const EVENT = {
    SORT_CELL: 'sorting',
    FILTER_FIELD: 'filter',
}

export default class TableBody {
    constructor(options) {
        this.table = options.table;
        this.dataTable = options.dataTable;

        this.pagination = new Pagination(options.wrapper);
        this.filter = new Filter(options.wrapper);
        this.selectedContact = new SelectedContact(options.wrapper);

        this.defaultKeys = ['id', 'firstName', 'lastName', 'email', 'phone'];
        this.contactsOnePage = 12;
        this.rowList = [];
        this.createRow = this.createRow.bind(this);
        this.createCell = this.createCell.bind(this);
        this.sortDirection = false;

        this.render(options.dataTable);
    }

    createTableBody(dataTable) {
        this.tbody = document.createElement('tbody');
        this.createPagination(dataTable);
        this.filter.render();
        this.filteredTable(dataTable, this.tbody);
        const buttonList = document.querySelectorAll(`.${this.pagination.buttonSelector}`);
        const th = document.querySelectorAll('th');

        th.forEach(item => {
            item.addEventListener('click', () => {
                this.sortColumn(item, dataTable);
                this.formattedTable({
                    btn: buttonList[0],
                    target: buttonList[0],
                    dataTable,
                    buttonList,
                });
            });
        });

        this.formattedTable({
            btn: buttonList[0],
            target: buttonList[0],
            dataTable,
            buttonList,
        });

        buttonList.forEach(btn => {
            btn.addEventListener('click', (
                ({ target }) => this.formattedTable({
                    btn,
                    target,
                    dataTable,
                    buttonList,
            })));
        });

        return this.tbody;
    }

    formattedTable(options) {
        const {
            btn,
            buttonList,
        } = options;
        this.removeActiveClass(btn, buttonList);
        this.renderTable(this.setPagination(options));
    }

    setPagination({ target, dataTable }) {
        let pageNum = parseInt(target.innerText,10);
        let startPage = this.pagination.startPage(pageNum, this.contactsOnePage);
        let endPage = this.pagination.endPage(startPage, this.contactsOnePage);

        let formattedDataTable = dataTable.slice(startPage, endPage);
        return formattedDataTable;
    }

    removeActiveClass(btn, btnList) {
        btnList.forEach(item => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });

        btn.classList.add('active');
    }

    createPagination(dataTable) {
        const countOfItems = Math.ceil(dataTable.length / this.contactsOnePage);
        this.pagination.render(countOfItems);
    }

    createRow(row) {
        return document.createElement(row);
    }

    createCell(value, tr, name) {
        this.rowList.push(tr);
        const td = document.createElement('td');
        td.addEventListener('click', ({ target }) => {
            this.rowList.forEach(row => {
                if (row.classList.contains('bg-primary')) {
                    row.classList.remove('text-white');
                    row.classList.remove('bg-primary');
                }
            })
            tr.classList.add('bg-primary', 'text-white');
            this.selectedContact.render({
                name,
                value,
                dataTable: this.dataTable,
            })
        });
        td.innerHTML = value;
        tr.appendChild(td);
    }

    //Временное решение фильтрации таблицы
    filteredTable(dataTable) {
        const inputField = document.querySelector('.form-control');
        inputField.addEventListener('input', ({ target }) => {
        });
    }

    sortColumn(columnName, dataTable) {
        this.tbody.innerHTML = '';

        dataTable = dataTable.sort((a,b) => {
            if (this.sortDirection) {
                if (a[columnName.dataset.field] < b[columnName.dataset.field]) {
                    return -1;
                } else if (a[columnName.dataset.field] > b[columnName.dataset.field]) {
                    return 1
                } else {
                    return 0
                }
            } else {
                if (a[columnName.dataset.field] > b[columnName.dataset.field]) {
                    return -1;
                } else if (a[columnName.dataset.field] < b[columnName.dataset.field]) {
                    return 1
                } else {
                    return 0
                }
            }
        });

        this.sortDirection = !this.sortDirection;
        this.renderTable(dataTable);
    }

    renderTable(formattedDataTable) {
        this.tbody.innerHTML = '';
        for(let key in formattedDataTable) {
            let tr = this.createRow('tr');
            this.tbody.appendChild(tr);

            this.defaultKeys.forEach(item => {
                this.createCell(formattedDataTable[key][item], tr, item);
            });
        }

        return this.tbody;
    }

    render(dataTable) {
        this.table.appendChild(this.createTableBody(dataTable));
    }
}