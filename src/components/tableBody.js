import Pagination from "./pagination";
import Filter from './filter';

const EVENT = {
    SORT_CELL: 'sorting',
    FILTER_FIELD: 'filter',
}

export default class TableBody {
    constructor(options) {
        this.table = options.table;

        this.pagination = new Pagination(options.wrapper);
        this.filter = new Filter(options.wrapper);

        this.defaultKeys = ['id', 'firstName', 'lastName', 'email', 'phone'];
        this.contactsOnePage = 12;
        this.createRow = this.createRow.bind(this);
        this.createCell = this.createCell.bind(this);
        this.render(options.dataTable);
    }

    createTableBody(dataTable) {
        const tbody = document.createElement('tbody');
        this.createPagination(dataTable);
        this.filteredTable(dataTable, tbody);
        const buttonList = document.querySelectorAll(`.${this.pagination.buttonSelector}`);

        this.formattedTable({
            btn: buttonList[0],
            target: buttonList[0],
            tbody,
            dataTable,
            buttonList,
        });

        buttonList.forEach(btn => {
            btn.addEventListener('click', (
                ({ target }) => this.formattedTable({
                    btn,
                    target,
                    tbody,
                    dataTable,
                    buttonList,
            })));
        });

        return tbody;
    }

    formattedTable(options) {
        const {
            btn,
            target,
            tbody,
            dataTable,
            buttonList,
        } = options;

        this.removeActiveClass(btn, buttonList);

        let pageNum = parseInt(target.innerText,10);
        let startPage = this.pagination.startPage(pageNum, this.contactsOnePage);
        let endPage = this.pagination.endPage(startPage, this.contactsOnePage);

        let formattedDataTable = dataTable.slice(startPage, endPage);

        tbody.innerHTML = '';
        for(let key in formattedDataTable) {
            let tr = this.createRow('tr');
            tbody.appendChild(tr);

            this.defaultKeys.forEach(item => {
                this.createCell(formattedDataTable[key][item], tr);
            });
        }

        return tbody;
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
        this.filter.render();
        this.pagination.render(countOfItems);
    }

    createRow(row) {
        return document.createElement(row);
    }

    createCell(value, tr) {
        const td = document.createElement('td');
        td.innerHTML = value;
        tr.appendChild(td);
    }

    //Временное решение фильтрации таблицы
    filteredTable(dataTable, tbody) {
        const inputField = document.querySelector('.form-control');
        inputField.addEventListener('input', ({ target }) => {
            tbody.innerHTML = '';
            for(let key in dataTable) {
                let tr = this.createRow('tr');
                tbody.appendChild(tr);

                this.defaultKeys.forEach(item => {
                    let filter = typeof dataTable[key][item] === 'string'
                        ? dataTable[key][item].toLowerCase()
                        : String(dataTable[key][item]);

                    if(filter.indexOf(target.value.toLowerCase()) > -1 && target.value !== '') {
                        this.createCell(dataTable[key]['id'], tr);
                        this.createCell(dataTable[key]['firstName'], tr);
                        this.createCell(dataTable[key]['lastName'], tr);
                        this.createCell(dataTable[key]['email'], tr);
                        this.createCell(dataTable[key]['phone'], tr);
                    }

                    if (target.value === '') {
                        this.createCell(dataTable[key][item], tr);
                    }
                });
            }
        });
    }

    render(dataTable) {
        this.table.appendChild(this.createTableBody(dataTable));
    }
}