import Pagination from "./pagination";

const EVENT = {
    SORT_CELL: 'sorting',
    FILTER_FIELD: 'filter',
}

export default class TableBody {
    constructor(options) {
        this.table = options.table;
        this.pagination = new Pagination(options.wrapper);
        this.defaultKeys = ['id', 'firstName', 'lastName', 'email', 'phone'];
        this.contactsOnePage = 12;
        this.createRow = this.createRow.bind(this);
        this.createCell = this.createCell.bind(this);
        this.render(options.dataTable);
    }

    createTableBody(dataTable) {
        const tbody = document.createElement('tbody');
        this.createPagination(dataTable);
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

    filter() {
        window.EventBus.fire(EVENT.FILTER_FIELD, this.filtered);
    }

    filtered({ target }) {
        console.log(target.value)
    }

    render(dataTable) {
        this.table.appendChild(this.createTableBody(dataTable));
    }
}