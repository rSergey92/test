import Filter from './filter';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Pagination from './pagination';

export default class Table {
    constructor(containerId, options = {}) {
        this.props = {
            ...options,
        }
        this.eventSort = new Event('clickSort');
        this.initTable(containerId);
    }

    initTable(id) {
        if (id) {
            this.containerContent = document.querySelector(id);
        }
        this.createTable();
    }

    createTable() {
        this.wrapper = document.createElement('div');
        this.table = document.createElement('table');
        this.table.classList.add('table', 'table-striped');

        this.containerContent.classList.add('content-table');
        this.wrapper.classList.add('content-table__wrapper');
        
        this.containerContent.appendChild(this.wrapper);

        this.filter = new Filter(this.wrapper);
        this.wrapper.appendChild(this.table);
        this.thead = new TableHeader(this.table);
        window.TableBody = new TableBody(this.table);
        this.pagination = new Pagination(this.wrapper);
    }

    clickHandler() {
        this.thead.clickHandler();
    }

    renderContent() {
        this.pagination.render();
    }
}